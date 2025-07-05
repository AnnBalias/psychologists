import PsychologistsItem from './PsychologistsItem/PsychologistsItem';
import css from './PsychologistsList.module.css';

const PsychologistsList = ({ psychologists }) => {
  console.log(psychologists);

  return (
    <ul className={css.list}>
      {psychologists.map((psychologist) => (
        <li key={psychologist.id} className={css.item}>
          <PsychologistsItem psychologist={psychologist} />
        </li>
      ))}
    </ul>
  );
};

export default PsychologistsList;
