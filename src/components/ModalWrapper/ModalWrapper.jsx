import css from './ModalWrapper.module.css';

const ModalWrapper = ({ component }) => {
  return <div className={css.modalWrapper}>{component}</div>;
};

export default ModalWrapper;
