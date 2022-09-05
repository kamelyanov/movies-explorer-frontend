import './App.css';

import Header from '../Header/Header';
import Promo from '../Promo/Promo'
import AboutProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';

function App() {
    
  return (
    <section className="page">
      <Header />
      {/* <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio /> */}
      <SearchForm />
      <Footer />
    </section>
  );
}

export default App;
