import React from 'react';

const GenreFilter = ({ genres, selectedGenres, onGenreChange }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2 text-neutral-white">Filter by Genre</h3>
      <div className="flex flex-wrap gap-4">
        {genres.map((genre) => (
          <label 
            key={genre.id} 
            className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200 ${
              selectedGenres.includes(genre.id) 
                ? 'bg-primary-light text-neutral-black' 
                : 'bg-primary-dark text-neutral-white hover:bg-primary-lighter'
            }`}
          >
            <input
              type="checkbox"
              value={genre.id}
              checked={selectedGenres.includes(genre.id)}
              onChange={(e) => onGenreChange(genre.id, e.target.checked)}
              className="hidden" // Hide the default checkbox
            />
            <span className="ml-2">{genre.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;
