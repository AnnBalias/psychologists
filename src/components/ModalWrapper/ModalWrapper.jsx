import { useEffect } from 'react';
import css from './ModalWrapper.module.css';

const ModalWrapper = ({ component, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className={css.modalWrapper} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>{component}</div>
    </div>
  );
};

export default ModalWrapper;
