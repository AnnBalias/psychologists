import { useEffect, useState, useMemo } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '../../firebase';
import Header from '../../components/Header/Header';
import PsychologistsList from '../../components/PsychologistsList/PsychologistsList';
import Select from 'react-select';
import customSelectStyles from '../../assets/styles/reactSelectStyles';
import css from './PsychologistsPage.module.css';

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

const PsychologistsPage = () => {
  const [allData, setAllData] = useState([]);
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState('id-asc');
  const [error, setError] = useState(null);

  const fetchAllData = async () => {
    try {
      setError(null);
      const snapshot = await get(ref(db, 'psychologist_1'));
      const data = snapshot.val();

      if (data) {
        let entries = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));

        return sortEntries(entries, sortOption);
      }

      return [];
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load data');
      return [];
    }
  };

  useEffect(() => {
    const load = async () => {
      const data = await fetchAllData();
      setAllData(data);
      setPage(1);
    };

    load();
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

        <PsychologistsList psychologists={paginatedData} />

        {paginatedData.length < allData.length && (
          <button onClick={handleLoadMore} className={css.loadMoreBtn}>
            Load more
          </button>
        )}
      </div>
    </div>
  );
};

export default PsychologistsPage;
