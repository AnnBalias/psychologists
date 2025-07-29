import { useState, useEffect } from 'react';
import ArrowSwg from '../../assets/icons/arrow.svg';
import css from './ScrollUpButton.module.css';

const ScrollUpButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    isVisible && (
      <button
        className={css.scrollUpBtn}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <img src={ArrowSwg} alt="Scroll to top" className={css.upSvg} />
      </button>
    )
  );
};

export default ScrollUpButton;
