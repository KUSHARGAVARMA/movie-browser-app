import React from 'react';
import MovieList from '../components/MovieList';

const Favorites = ({ favorites, removeFavorite }) => {
  return (
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
  );
};

export default Favorites;
