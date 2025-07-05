import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase';
import Header from '../../components/Header/Header';
import PsychologistsList from '../../components/PsychologistsList/PsychologistsList';
import css from './PsychologistsPage.module.css';

const PsychologistsPage = () => {
  const [psychologists, setPsychologists] = useState([]);

  useEffect(() => {
    const psychologistsRef = ref(db, 'psychologist_1');

    const unsubscribe = onValue(psychologistsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const psychologistsArray = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setPsychologists(psychologistsArray);
      } else {
        setPsychologists([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Header />
      <div className={css.pageContent}>
        <PsychologistsList psychologists={psychologists} />
      </div>
    </div>
  );
};

export default PsychologistsPage;
