import { useEffect, useState, useMemo } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '../../firebase';
import Header from '../../components/Header/Header';
import PsychologistsList from '../../components/PsychologistsList/PsychologistsList';
import Select from 'react-select';
import customSelectStyles from '../../assets/styles/reactSelectStyles';
import css from '../PsychologistsPage/PsychologistsPage.module.css';
import toast from 'react-hot-toast/headless';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Loader from '../../components/Loader/Loader';

const onPage = 3;
const sortOptions = [
  { value: 'name-asc', label: 'A to Z' },
  { value: 'name-desc', label: 'Z to A' },
  { value: 'price-asc', label: 'Low price' },
  { value: 'price-desc', label: 'High price' },
  { value: 'rating-desc', label: 'Popular' },
  { value: 'rating-asc', label: 'Not popular' },
  { value: 'id-asc', label: 'Show all' },
];

const sortEntries = (entries, sortOption) => {
  if (sortOption === 'id-asc') return entries;

  const [sortFieldRaw, sortDirection] = sortOption.split('-');
  const sortField = sortFieldRaw === 'price' ? 'price_per_hour' : sortFieldRaw;

  return entries.sort((a, b) => {
    if (sortField === 'name') {
      return sortDirection === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }

    const aVal = Number(a[sortField]) || 0;
    const bVal = Number(b[sortField]) || 0;

    return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
  });
};

const FavoritesPage = () => {
  const [allData, setAllData] = useState([]);
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState('id-asc');
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllData = async () => {
    try {
      setError(null);
      const snapshot = await get(ref(db, 'psychologist_1'));
      const data = snapshot.val();

      if (data) {
        const favoriteIds = JSON.parse(localStorage.getItem('favorites')) || [];

        let entries = Object.entries(data)
          .map(([id, value]) => ({ id, ...value }))
          .filter((item) => favoriteIds.includes(item.id));

        return sortEntries(entries, sortOption);
      }

      return [];
    } catch (err) {
      toast.error('Failed to load data');
      setError('Failed to load data');
      return [];
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    const load = async () => {
      setIsLoading(true);
      const data = await fetchAllData();
      setAllData(data);
      setPage(1);
      setIsLoading(false);
    };

    load();
    return () => unsubscribe();
  }, [sortOption]);

  const paginatedData = useMemo(() => {
    return allData.slice(0, page * onPage);
  }, [allData, page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      <Header />
      <div className={css.pageContent}>
        <div className={css.filtersBox}>
          <label htmlFor="sort-select" className={css.filtersLabel}>
            Filters
          </label>
          <Select
            inputId="sort-select"
            options={sortOptions}
            value={sortOptions.find((option) => option.value === sortOption)}
            onChange={(selected) => setSortOption(selected.value)}
            styles={customSelectStyles}
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <PsychologistsList psychologists={paginatedData} user={user} />
            {paginatedData.length < allData.length && (
              <button onClick={handleLoadMore} className={css.loadMoreBtn}>
                Load more
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
