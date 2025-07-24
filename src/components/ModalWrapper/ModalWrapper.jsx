import { useEffect, useState } from 'react';
import css from './ModalWrapper.module.css';

const ModalWrapper = ({ component, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  useEffect(() => {
    const currentScroll = window.scrollY;
    setScrollY(currentScroll);
    document.body.style.position = 'fixed';
    document.body.style.top = `-${currentScroll}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';

    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      window.scrollTo(0, currentScroll);
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      className={`${css.modalWrapper} ${
        isClosing ? css.closing : isVisible ? css.open : ''
      }`}
      onClick={handleClose}
    >
      <div onClick={(e) => e.stopPropagation()} className={css.modalContent}>
        {component}
      </div>
    </div>
  );
};

export default ModalWrapper;
