import { useEffect } from 'react';
import css from './ModalWrapper.module.css';

const ModalWrapper = ({ component, onClose }) => {
  useEffect(() => {
    document.body.style.position = 'fixed';
    document.body.style.top = '0';
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflowY = 'scroll';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflowY = '';
      window.scrollTo(0, scrollY);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={css.modalWrapper} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>{component}</div>
    </div>
  );
};

export default ModalWrapper;
