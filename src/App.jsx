import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import PsychologistsPage from './pages/PsychologistsPage/PsychologistsPage';
import { Toaster } from 'react-hot-toast';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/psychologists" element={<PsychologistsPage />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
      </Routes>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
        }}
      />
    </>
  );
}

export default App;
