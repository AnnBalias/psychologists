import { useNavigate } from 'react-router-dom';
import ArrowSvg from '../../assets/icons/arrow.svg';
import CheckSvg from '../../assets/icons/check.svg';
import css from './Hero.module.css';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className={css.hero}>
      <div className={css.textBox}>
        <h1 className={css.heroTitle}>
          The road to the <span className={css.titleSpan}>depths</span> of the
          human soul
        </h1>
        <p className={css.heroText}>
          We help you to reveal your potential, overcome challenges and find a
          guide in your own life with the help of our experienced psychologists.
        </p>
        <button
          onClick={() => navigate('/psychologists')}
          className={css.heroLink}
        >
          Get started
          <img
            src={ArrowSvg}
            alt="View psychologists"
            className={css.LinkSvg}
          />
        </button>
      </div>
      <div className={css.heroImg}>
        <div className={css.peopleBlock}></div>
        <div className={css.questionBlock}></div>
        <div className={css.infoBox}>
          <img src={CheckSvg} alt="Check" className={css.checkSvg} />
          <p className={css.infoText}>
            Experienced psychologists
            <span className={css.infoSpan}>15,000</span>
          </p>
        </div>
      </div>
    </div>
  );
};
