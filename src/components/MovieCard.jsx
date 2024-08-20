import React from 'react';

const MovieCard = ({ movie, onFavorite, isFavoritePage }) => {
  return (
    <div className="p-1 rounded-lg bg-gradient-to-br from-primary-darkest/60 to-primary-darkest/60 shadow-lg">
      <div className="rounded-lg overflow-hidden">
        <div className="relative">
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title} 
            className="w-full h-90 object-contain transition-transform transform hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h2 className="text-neutral-grey text-xl font-bold truncate">{movie.title}</h2>
          <p className="text-neutral-gray mt-1">{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
          <button
            onClick={() => onFavorite(movie)}
            className={`mt-4 w-full py-2 rounded text-white transition-colors duration-300 ${
              isFavoritePage ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary-dark'
            }`}
            aria-label={isFavoritePage ? 'Remove from Favorites' : 'Add to Favorites'}
          >
            {isFavoritePage ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;