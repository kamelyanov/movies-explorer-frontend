import React, { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext"
import { Validation } from "../../utils/Validation";
import Preloader from "../Preloader/Preloader";

import "./Profile.css";

function Profile(props) {
  const {
    setEditProfile,
    handleUpdateUser,
    handleloggedOutClick,
    setSuccessEditProfile,
    editProfile,
    errorMesage,
    blockInput,
    successEditProfile,
    showPreloader,
  } = props;

  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid } = Validation();

  console.log(currentUser)

  function handleEdit(e) {
    e.preventDefault();
    setEditProfile(true);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleUpdateUser(values.name ? values.name : currentUser.name, values.email ? values.email : currentUser.email);
  }

  useEffect(() => {
    values.name = currentUser.name;
    values.email = currentUser.email;
    return () => {
      setSuccessEditProfile(false);
    };
  }, []);

  useEffect(() => {
    editProfile && setSuccessEditProfile(false);
  }, [editProfile, setSuccessEditProfile]);

  return (
    <>
      <section className="profile">
        {showPreloader && <Preloader />}
        <form noValidate
          className="profile__form"
          onSubmit={handleSubmit}
        >
          <h2 className="profile__title">Привет, {currentUser.name}!</h2>
          <div className="profile__container">
            <p className={`profile__error-text ${!errors.name && `profile__error-text_type_disabled`}`}>
              {errors.name ? errors.name : "⁣"}
            </p>
            <div className="profile__form-element">
              <p className="profile__text">Имя</p>
              <input
                className={`profile__input ${errors.name && `profile__input_type_error`}`}
                type="name"
                name="name"
                onChange={handleChange}
                minLength="2"
                maxLength="30"
                pattern="^[A-Za-zА-Яа-я\s]{1,}$"
                required
                autoComplete="off"
                defaultValue={currentUser.name}
                disabled={(!editProfile || blockInput) && "disabled"}
              />
            </div>
            <div className="profile__form-element">
              <p className="profile__text">E-mail</p>
              <input
                className={`profile__input ${errors.email && `profile__input_type_error`}`}
                type="email"
                name="email"
                onChange={handleChange}
                minLength="2"
                maxLength="30"
                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$"
                required
                defaultValue={currentUser.email}
                disabled={(!editProfile || blockInput) && "disabled"}
              />
            </div>
            <p className={`profile__error-text ${!errors.email && `profile__error-text_type_disabled`}`}>
              {errors.email ? errors.email : ""}
            </p>
          </div>
          <div className="profile__exit">
            {successEditProfile && <p className="profile__successMessage">Профиль изменен успешно</p>}
            {!editProfile ? (
              <button className="profile__button link-opacity" onClick={handleEdit}>
                Редактировать
              </button>
            ) : (
              <div className="profile__saveContainer">
                {errorMesage && <p className="profile__submitError">{errorMesage}</p>}
                <button
                  type="submit"
                  className={`profile__button ${!isValid || (values.name === currentUser.name && values.email === currentUser.email)
                      ? "profile__submit-button_type_disable"
                      : "link-opacity"
                    }`}
                  disabled={
                    !isValid || (values.name === currentUser.name && values.email === currentUser.email)
                      ? "disabled"
                      : ""
                  }
                  onClick={handleSubmit}
                >
                  Сохранить
                </button>
              </div>
            )}
            <button className="profile__exit-button link-opacity" onClick={handleloggedOutClick} type="submite">
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Profile;
