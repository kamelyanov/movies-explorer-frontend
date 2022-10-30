import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import * as MainApi from "../../utils/MainApi";

import './App.css';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { CurrentUserContext } from "../../contexts/CurrentUserContext"

function App() {
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token") !== null);
  const [currentUser, setCurrentUser] = useState({});
  const [saveCards, setSaveCards] = useState([]);
  const [errorMesage, setErrorMesage] = useState("");
  const [blockInput, setBlockInput] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [successEditProfile, setSuccessEditProfile] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      MainApi.getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          handleloggedOutClick();
          console.log(err);
        });
    }
  }, [loggedIn]);

  function registration(name, email, password) {
    setShowPreloader(true);
    setBlockInput(true);
    MainApi.register(name, email, password)
      .then((res) => {
        if (email === res.email) {
          authorization(email, password);
          navigate('/movies');
        }
      })
      .catch((err) => {
        setErrorMesage(err.message);
      })
      .finally(() => {
        setShowPreloader(false);
        setBlockInput(false);
      });
  }

  function authorization(email, password) {
    setShowPreloader(true);
    setBlockInput(true);
    MainApi.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setLoggedIn(true);
          navigate('/movies');
        }
      })
      .catch((err) => {
        setErrorMesage(err.message);
      })
      .finally(() => {
        setShowPreloader(false);
        setBlockInput(false);
      });
  }

  function handleUpdateUser(name, email) {
    setShowPreloader(true);
    setBlockInput(true);
    MainApi.patchUserInfo(name, email)
      .then((response) => {
        setCurrentUser(response);
        setErrorMesage("");
        setEditProfile(false);
        setSuccessEditProfile(true);
      })
      .catch((err) => {
        setErrorMesage(err.message);
        setEditProfile(true);
        setSuccessEditProfile(false);
      })
      .finally(() => {
        setShowPreloader(false);
        setBlockInput(false);
      });
  }

  function handleloggedOutClick() {
    localStorage.removeItem("filterCards");
    localStorage.removeItem("moviesTumbler");
    localStorage.removeItem("savedMoviesTumbler");
    localStorage.removeItem("moviesInputValue");
    localStorage.removeItem("savedMoviesInputValue");
    localStorage.removeItem("token");
    localStorage.removeItem("lastSearch");
    localStorage.removeItem("lastShortFilm");
    setLoggedIn(false);
    setShowPreloader(false);
    navigate('/');
  }

  function handleSaveFilm(card) {
    setShowPreloader(true);
    setBlockInput(true);
    MainApi.saveFilm(card)
      .then((res) => {
        setSaveCards([...saveCards, res]);
      })
      .catch((err) => {
        console.log(err);
        setErrorMesage("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.")
      })
      .finally(() => {
        setShowPreloader(false);
        setBlockInput(false);
      });
  }

  function handleDeleteFilm(movieId) {
    const movieData = saveCards.find(savedCard => savedCard.movieId === movieId);
    setShowPreloader(true);
    setBlockInput(true);
    MainApi.deleteFilm(movieData._id)
      .then(() => {
        setSaveCards(saveCards.filter(savedCard => savedCard.movieId !== movieId));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setShowPreloader(false);
        setBlockInput(false);
      });
  }

  const loadMovies = async () => {
    try {
      setSaveCards(await MainApi.getFilms());
    } catch (err) {
      console.log(err);
    } finally {
      setShowPreloader(false);
    }
  };

  useEffect (() =>{
    if (!loggedIn) {
      setSaveCards([])
      return
    }
    loadMovies();
  }, [loggedIn, currentUser])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <section className="page">
        <Header loggedIn={loggedIn} />
        <Routes>
          <Route path="/" index element={<Main loggedIn={loggedIn} />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route
            path="/movies"
            element={loggedIn ? <Movies savedMovies={saveCards} handleSaveFilm={handleSaveFilm} handleDeleteFilm={handleDeleteFilm} loggedIn={loggedIn}/> : <Navigate to="/" replace />}
          />

          <Route
            path="/saved-movies"
            element={loggedIn ? <SavedMovies savedMovies={saveCards} handleDeleteFilm={handleDeleteFilm}/> : <Navigate to="/" replace />}
          />

          <Route
            path="/profile"
            element={
              loggedIn
                ? <Profile
                  loggedIn={loggedIn}
                  setEditProfile={setEditProfile}
                  handleUpdateUser={handleUpdateUser}
                  handleloggedOutClick={(e) => {
                    e.preventDefault()
                    handleloggedOutClick()
                    }}
                  setSuccessEditProfile={setSuccessEditProfile}
                  editProfile={editProfile}
                  errorMesage={errorMesage}
                  blockInput={blockInput}
                  successEditProfile={successEditProfile}
                  showPreloader={showPreloader}

                />
                : <Navigate to="/" replace />
            }
          />

          <Route path="/signin"
            element={
              loggedIn? 
              <Navigate to="/" replace />
              :
              <Login
                errorMesage={errorMesage}
                handleSubmit={authorization}
                blockInput={blockInput}
                showPreloader={showPreloader}
              />}
          />
          <Route path="/signup"
            element={
              loggedIn? 
              <Navigate to="/" replace />
              :
              <Register
                errorMesage={errorMesage}
                handleSubmit={registration}
                blockInput={blockInput}
                showPreloader={showPreloader}
              />}
          />
        </Routes>
        <Footer />
      </section>
    </CurrentUserContext.Provider>
  );
}

export default App;
