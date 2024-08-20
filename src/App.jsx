import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
// import NotFound from './pages/NotFound';
import { FavoritesProvider } from './context/FavoritesContext';

const App = () => {
  return (
    <FavoritesProvider>
      <div className="bg-custom-gradient from-primary-darkest to-primary-light min-h-screen text-white">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Router>
      </div>
    </FavoritesProvider>
  );
};

export default App;
