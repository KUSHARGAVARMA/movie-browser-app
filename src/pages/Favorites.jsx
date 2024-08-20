import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MovieList from '../components/MovieList';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when component mounts
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  };

  // Remove a movie from favorites
  const removeFavorite = (movieId) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

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
