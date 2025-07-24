import CloseSvg from '../../assets/icons/close.svg';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import css from './AppointmentModal.module.css';

const AppointmentModal = ({ onClose, psychologist }) => {
  const { name, avatar_url } = psychologist;

  return (
    <div className={css.base}>
      <button onClick={onClose} className={css.closeBtn}>
        <img src={CloseSvg} alt="Close button" className={css.closeSvg} />
      </button>
      <h2 className={css.title}>Make an appointment with a psychologists</h2>
      <p className={css.text}>
        You are on the verge of changing your life for the better. Fill out the
        short form below to book your personal appointment with a professional
        psychologist. We guarantee confidentiality and respect for your privacy.
      </p>
      <div className={css.psychologistBox}>
        <img src={avatar_url} alt={name} className={css.avatar} />
        <div className={css.psychologistInfo}>
          <p className={css.psychologist}>Your psychologists</p>
          <p className={css.name}>{name}</p>
        </div>
      </div>
      <AppointmentForm />
    </div>
  );
};

export default AppointmentModal;
