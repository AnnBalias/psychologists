import { BounceLoader } from 'react-spinners';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loaderWrapper}>
      <BounceLoader size={60} color={'#54be96'} />
    </div>
  );
};

export default Loader;
