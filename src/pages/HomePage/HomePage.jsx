import Header from '../../components/Header/Header.jsx';
import { Hero } from '../../components/Hero/Hero.jsx';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={css.homeBg}>
      <Header />
      <Hero />
    </div>
  );
};

export default HomePage;
