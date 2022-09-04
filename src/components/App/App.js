import './App.css';

import Header from '../Header/Header';
import Promo from '../Promo/Promo'
import AboutProject from '../AboutProject/AboutProject'

function App() {
    
  return (
    <section className="page">
      <Header />
      <Promo />
      <AboutProject />
    </section>
  );
}

export default App;
