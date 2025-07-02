import CloseSvg from '../../assets/icons/close.svg';
import LoginForm from '../LoginForm/LoginForm';
import css from './LoginModal.module.css';

const LoginModal = () => {
  return (
    <div className={css.base}>
      <button className={css.closeBtn}>
        <img src={CloseSvg} alt="Close button" className={css.closeSvg} />
      </button>
      <h2 className={css.title}>Log In</h2>
      <p className={css.text}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for a psychologist.
      </p>
      <LoginForm />
    </div>
  );
};

export default LoginModal;
