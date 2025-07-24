import PsychologistsItem from './PsychologistsItem/PsychologistsItem';
import css from './PsychologistsList.module.css';

const PsychologistsList = ({ psychologists, user }) => {
  return (
    <ul className={css.list}>
      {psychologists.map((psychologist) => (
        <li key={psychologist.id} className={css.item}>
          <PsychologistsItem psychologist={psychologist} user={user} />
        </li>
      ))}
    </ul>
  );
};

export default PsychologistsList;
