import "./Profile.css";

function Profile(props) {
  const { loggedIn, handleloggedInClick } = props;

  return (
    <>
      <section className="profile">
        <form className="profile__form">
          <h2 className="profile__title">Привет, Виталий!</h2>
          <div className="profile__container">
            <div className="profile__form-element">
              <p className="profile__text">Имя</p>
              <input className="profile__input" type="text" value="Виталий" />
            </div>
            <div className="profile__form-element">
              <p className="profile__text">E-mail</p>
              <input className="profile__input" type="email" value="pochta@yandex.ru" />
            </div>
          </div>
          <div className="profile__exit">
            <button type="submit" className="profile__button link-opacity">
              Редактировать
            </button>
            <button className="profile__exit-button link-opacity" onClick={handleloggedInClick}>
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Profile;