import CloseSvg from '../../assets/icons/close.svg';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import css from './AppointmentModal.module.css';

const AppointmentModal = () => {
  return (
    <div className={css.base}>
      <button className={css.closeBtn}>
        <img src={CloseSvg} alt="Close button" className={css.closeSvg} />
      </button>
      <h2 className={css.title}>Make an appointment with a psychologists</h2>
      <p className={css.text}>
        You are on the verge of changing your life for the better. Fill out the
        short form below to book your personal appointment with a professional
        psychologist. We guarantee confidentiality and respect for your privacy.
      </p>
      <p>PSYCHOLOGIST</p>
      <AppointmentForm />
    </div>
  );
};

export default AppointmentModal;
