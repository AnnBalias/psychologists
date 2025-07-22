import CloseSvg from '../../assets/icons/close.svg';
import RegistrForm from '../RegistrForm/RegistrForm';
import css from './RegistrModal.module.css';

const RegistrModal = ({ onClose }) => {
  return (
    <div className={css.base}>
      <button onClick={onClose} className={css.closeBtn}>
        <img src={CloseSvg} alt="Close button" className={css.closeSvg} />
      </button>
      <h2 className={css.title}>Registration</h2>
      <p className={css.text}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>
      <RegistrForm onClose={onClose} />
    </div>
  );
};

export default RegistrModal;
