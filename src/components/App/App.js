import { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
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
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const history = useHistory()
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [saveCards, setSaveCards] = useState([]);
  const [errorMesage, setErrorMesage] = useState("");
  const [blockInput, setBlockInput] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [successEditProfile, setSuccessEditProfile] = useState(false);

  function registration({ name, email, password }) {
    setShowPreloader(true);
    setBlockInput(true);
    MainApi.register({ name, email, password })
      .then((res) => {
        if (email === res.email) {
          authorization(email, password);
          history.push('/movies')
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
          history.push('/movies')
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

  function handleloggedOutClick(evt) {
    evt.preventDefault();
    localStorage.removeItem("filterCards");
    localStorage.removeItem("moviesTumbler");
    localStorage.removeItem("savedMoviesTumbler");
    localStorage.removeItem("moviesInputValue");
    localStorage.removeItem("savedMoviesInputValue");
    localStorage.removeItem("token");
    setLoggedIn(false);
    history.push('/')
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
      })
      .finally(() => {
        setShowPreloader(false);
        setBlockInput(false);
      });
  }

  function handleDeleteFilm(card) {
    setShowPreloader(true);
    setBlockInput(true);
    MainApi.deleteFilm(card)
      .then(() => {
        setSaveCards(saveCards.filter((saveCard) => saveCard._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setShowPreloader(false);
        setBlockInput(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <section className="page">
        <Header loggedIn={loggedIn} />
        <Switch>
          <Route path="/">
            <Main loggedIn={loggedIn} />
          </Route>

          <ProtectedRoute
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
          />

          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies} loggedIn={loggedIn}
          />

          <ProtectedRoute loggedIn={loggedIn}
            path="/profile"
            component={Profile}
            setEditProfile={setEditProfile}
            handleUpdateUser={handleUpdateUser}
            handleloggedOutClick={handleloggedOutClick}
            setSuccessEditProfile={setSuccessEditProfile}
            editProfile={editProfile}
            errorMesage={errorMesage}
            blockInput={blockInput}
            successEditProfile={successEditProfile}
            showPreloader={showPreloader}
          />

          <Route path="/signin"
            element={
              <Login
                errorMesage={errorMesage}
                handleSubmit={authorization}
                blockInput={blockInput}
                showPreloader={showPreloader}
              />}
          />
          <Route path="/signup"
            element={
              <Register
                errorMesage={errorMesage}
                handleSubmit={registration}
                blockInput={blockInput}
                showPreloader={showPreloader}
              />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Switch>
        <Footer />
      </section>
    </CurrentUserContext.Provider>
  );
}

export default App;
