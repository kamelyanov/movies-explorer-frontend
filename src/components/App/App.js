import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router";
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

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMesage, setErrorMesage] = useState("");
  const [blockInput, setBlockInput] = useState(false);

  function registration(name, email, password) {
    setBlockInput(true);
    MainApi.register(name, email, password)
      .then((res) => {
        if (email === res.email) {
          authorization(email, password);
          navigate("/movies", { replace: false });
        }
      })
      .catch((err) => {
        setErrorMesage(err.message);
      })
      .finally(() => {
        setBlockInput(false);
      });
  }

  function authorization(email, password) {
    setBlockInput(true);
    MainApi.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setLoggedIn(true);
          navigate("/movies", { replace: false });
        }
      })
      .catch((err) => {
        setErrorMesage(err.message);
      })
      .finally(() => {
        setBlockInput(false);
      });
  }

  function handleloggedInClick(e) {
    e.preventDefault();

    navigate("/", { replace: false });
  }

  return (
    <section className="page">
      <Header loggedIn={loggedIn} />
      <Routes>
        <Route path="/" element={<Main loggedIn={loggedIn} />} />
        <Route
          path="/movies"
          element={<Movies loggedIn={loggedIn} />}
        />
        <Route
          path="/saved-movies"
          element={<SavedMovies loggedIn={loggedIn} />}
        />
        <Route path="/profile" element={<Profile loggedIn={loggedIn} handleloggedInClick={handleloggedInClick} />} />
        <Route path="/signin" element={<Login handleloggedInClick={handleloggedInClick} />} />
        <Route path="/signup" 
          element={
            <Register 
              errorMesage={errorMesage}
              handleSubmit={registration}
              blockInput={blockInput}
            />}
          />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </section>
  );
}

export default App;
