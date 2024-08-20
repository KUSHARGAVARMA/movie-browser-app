import React from 'react';

const SortOptions = ({ sortBy, onSortChange }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2 text-neutral-white">Sort By</h3>
      <div className="relative">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="appearance-none w-full p-3 rounded-lg bg-primary-dark text-white focus:outline-none focus:ring-2 focus:ring-secondary-dark shadow-md"
        >
          <option value="popularity.desc">Popularity (Descending)</option>
          <option value="popularity.asc">Popularity (Ascending)</option>
          <option value="release_date.desc">Release Date (Newest First)</option>
          <option value="release_date.asc">Release Date (Oldest First)</option>
          <option value="vote_average.desc">Rating (Highest First)</option>
          <option value="vote_average.asc">Rating (Lowest First)</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SortOptions;
