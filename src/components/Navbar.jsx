import React, { useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from '../utils/debounce';
import logo from '../assets/logo.svg';
import { FavoritesContext } from '../context/FavoritesContext'; // Import FavoritesContext
import { FaHeart } from 'react-icons/fa'; // Import heart icon from react-icons

const Navbar = ({ onSearch, resetMovies }) => {
  const { favorites } = useContext(FavoritesContext); // Access the favorites from context

  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.trim() === '') {
        resetMovies(); // Reset to default movies if search is empty
      } else {
        onSearch(query);
      }
    }, 1000),
    [onSearch, resetMovies]
  );

  const handleHomeClick = () => {
    window.location.href = '/'; // Navigate to the home route and reload the page
  };

  return (
    <nav className="bg-custom-gradient text-neutral-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <button 
          className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-secondary rounded"
          aria-label="Go to Home"
          onClick={handleHomeClick} // Navigate to the home route and reload
        >
          <img src={logo} alt="Movie Browser Logo" className="h-8 w-8" />
        </button>
        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search movies..."
            className="w-full p-2 rounded bg-primary-dark text-neutral-white placeholder-neutral-grey focus:outline-none focus:ring-2 focus:ring-secondary transition-colors duration-300 ease-in-out"
            onChange={(e) => debouncedSearch(e.target.value)}
            aria-label="Search movies"
          />
        </div>
        <div className="flex space-x-4 items-center">
          <Link 
            to="/favorites" 
            className="text-neutral-white hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary rounded transition-colors duration-200 flex items-center"
            aria-label="Go to Favorites"
          >
            <FaHeart className="text-red-500 mr-2" /> {/* Heart icon */}
            Favorites {favorites.length > 0 && `(${favorites.length})`} {/* Display favorite count */}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
