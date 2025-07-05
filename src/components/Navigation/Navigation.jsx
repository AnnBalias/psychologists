import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Navigation.module.css';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.navLink, isActive && css.navActive);
};

const Navigation = ({ user }) => {
  return (
    <nav className={css.nav}>
      <NavLink to="/" className={buildLinkClass}>
        Home
      </NavLink>
      <NavLink to="/psychologists" className={buildLinkClass}>
        Psychologists
      </NavLink>
      {false && (
        <NavLink to="/favorites" className={buildLinkClass}>
          Favorites
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
