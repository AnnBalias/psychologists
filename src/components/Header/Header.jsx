import { auth, db } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import RegistrModal from '../RegistrModal/RegistrModal';
import LoginModal from '../LoginModal/LoginModal';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import css from './Header.module.css';
import clsx from 'clsx';
import UserSvg from '../../assets/icons/user.svg';

const Header = () => {
  const [user, setUser] = useState(null);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
          const snapshot = await get(ref(db, 'users/' + authUser.uid));
          const userData = snapshot.val();

          setUser({
            uid: authUser.uid,
            email: authUser.email,
            name: userData?.username || 'User',
          });
        } catch (error) {
          console.error('Failed to load user data:', error);
          setUser({
            uid: authUser.uid,
            email: authUser.email,
            name: 'User',
          });
        }
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success('Successful logout');
    } catch (error) {
      toast.error('Щось пішло не так!');
    }
  };

  const renderModal = () => {
    if (modal === 'register') {
      return (
        <ModalWrapper
          component={<RegistrModal onClose={() => setModal(null)} />}
          onClose={() => setModal(null)}
        />
      );
    }

    if (modal === 'login') {
      return (
        <ModalWrapper
          component={<LoginModal onClose={() => setModal(null)} />}
          onClose={() => setModal(null)}
        />
      );
    }

    return null;
  };

  return (
    <>
      <header className={css.header}>
        <Link to="/" className={clsx(css.logo)}>
          psychologists<span className={css.logoDot}>.</span>
          <span className={css.logoSpan}>services</span>
        </Link>

        <Navigation user={user} />

        {user ? (
          <div className={css.isUser}>
            <div className={css.user}>
              <img src={UserSvg} alt="User" className={css.UserSvg} />
              <p className={css.userName}>{user.name}</p>
            </div>
            <button onClick={logout} className={css.logBtn}>
              Log out
            </button>
          </div>
        ) : (
          <div className={css.notUser}>
            <button className={css.logBtn} onClick={() => setModal('login')}>
              Log In
            </button>
            <button
              className={css.registrBtn}
              onClick={() => setModal('register')}
            >
              Registration
            </button>
          </div>
        )}
      </header>

      {renderModal()}
    </>
  );
};

export default Header;
