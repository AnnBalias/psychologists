import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import css from './Header.module.css';
import clsx from 'clsx';

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  async function logout() {
    try {
      await signOut(auth);
      setUser(null);
      toast.success('successful logout');
    } catch (error) {
      toast.error('Щось пішло не так!');
    }
  }

  return (
    <header className={css.header}>
      <Link to={'/'} className={clsx(css.logo, false && css.LogoSpace)}>
        psychologists<span className={css.logoDot}>.</span>
        <span className={css.logoSpan}>services</span>
      </Link>
      <Navigation user={!!user} />
      {false ? (
        <div className={css.isUser}>
          <div className={css.user}>
            <p className={css.userLogo}>A</p>
            <p className={css.userName}>1234567890</p>
          </div>
          <button onClick={logout} className={css.logBtn}>
            Log out
          </button>
        </div>
      ) : (
        <div className={css.notUser}>
          <button className={css.logBtn}>Log In</button>
          <button className={css.registrBtn}>Registration</button>
        </div>
      )}
    </header>
  );
};

export default Header;
