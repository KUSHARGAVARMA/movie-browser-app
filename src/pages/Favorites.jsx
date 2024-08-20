import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import MovieList from '../components/MovieList';
import { FavoritesContext } from '../context/FavoritesContext'; // Import the context

const Favorites = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext); // Access favorites and removeFavorite from context

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-4">
        <h2 className="text-2xl font-bold mb-4">Your Favorites</h2>
        {favorites.length > 0 ? (
          <MovieList 
            movies={favorites} 
            onFavorite={(movie) => removeFavorite(movie.id)} 
            isFavoritePage={true} 
          />
        ) : (
          <p>You have no favorite movies yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
