import PsychologistsItem from './PsychologistsItem/PsychologistsItem';
import css from './PsychologistsList.module.css';

const PsychologistsList = ({
  psychologists,
  user,
  favorites,
  setFavorites,
}) => {
  return (
    <ul className={css.list}>
      {psychologists.map((psychologist) => (
        <li key={psychologist.id} className={css.item}>
          <PsychologistsItem
            psychologist={psychologist}
            user={user}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        </li>
      ))}
    </ul>
  );
};

export default PsychologistsList;
