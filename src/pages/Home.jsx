// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Navbar from '../components/Navbar';
// import MovieList from '../components/MovieList';
// import GenreFilter from '../components/GenreFilter';
// import SortOptions from '../components/SortOptions';
// import { fetchMovies, fetchGenres, searchMovies, clearList, setSearchMode } from '../features/movies/moviesSlice';
// import { useFavorites } from '../hooks/useFavorites';
// import { debounce } from 'lodash';

// const Home = () => {
//   const dispatch = useDispatch();
//   const { list: movies, genres, loading, error, isSearchMode } = useSelector((state) => state.movies);
//   const { addFavorite, isFavorite } = useFavorites();

//   const [selectedGenres, setSelectedGenres] = useState([]);
//   const [sortBy, setSortBy] = useState('popularity.desc');
//   const [page, setPage] = useState(1);
//   const [query, setQuery] = useState('');

//   // Fetch genres once on component mount
//   useEffect(() => {
//     dispatch(fetchGenres());
//     dispatch(fetchMovies({ genres: '', sortBy, page: 1 }));
//   }, [dispatch, sortBy]);

//   // Handle infinite scroll
//   useEffect(() => {
//     const handleScroll = debounce(() => {
//       if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
//       setPage((prevPage) => prevPage + 1);
//     }, 200);

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [loading]);

//   // Fetch more movies when page changes
//   useEffect(() => {
//     if (isSearchMode) {
//       dispatch(searchMovies({ query, page }));
//     } else {
//       const genreString = selectedGenres.join(',');
//       dispatch(fetchMovies({ genres: genreString, sortBy, page }));
//     }
//   }, [page, selectedGenres, sortBy, dispatch, query, isSearchMode]);

//   const resetMovies = () => {
//     dispatch(clearList());
//     dispatch(setSearchMode(false)); // Exit search mode
//     setPage(1);
//     dispatch(fetchMovies({ genres: '', sortBy: 'popularity.desc', page: 1 }));
//   };

//   const handleSearch = (searchQuery) => {
//     setQuery(searchQuery);
//     if (searchQuery.trim() === '') {
//       resetMovies();
//     } else {
//       dispatch(clearList());
//       dispatch(setSearchMode(true)); // Enter search mode
//       setPage(1);
//       dispatch(searchMovies({ query: searchQuery, page: 1 }));
//     }
//   };

//   const handleAddToFavorites = (movie) => {
//     if (isFavorite(movie.id)) {
//       alert(`${movie.title} is already in your favorites!`);
//       return;
//     }
//     addFavorite(movie);
//     alert(`${movie.title} has been added to your favorites!`);
//   };

//   const handleGenreChange = (genreId, isChecked) => {
//     setSelectedGenres((prev) =>
//       isChecked ? [...prev, genreId] : prev.filter((id) => id !== genreId)
//     );
//     setPage(1);
//     dispatch(clearList());
//   };

//   const handleSortChange = (sortOption) => {
//     setSortBy(sortOption);
//     setPage(1);
//     dispatch(clearList());
//   };

//   return (
//     <div>
//       <Navbar onSearch={handleSearch} resetMovies={resetMovies} />
//       <div className="container mx-auto mt-4">
//         <GenreFilter
//           genres={genres}
//           selectedGenres={selectedGenres}
//           onGenreChange={handleGenreChange}
//         />
//         <SortOptions sortBy={sortBy} onSortChange={handleSortChange} />

//         {loading && <p>Loading movies...</p>}
//         {error && (
//           <div className="text-red-500">
//             <p>Failed to load movies. Please try again later.</p>
//             <button onClick={resetMovies} className="bg-red-500 text-white p-2 rounded mt-2">
//               Retry
//             </button>
//           </div>
//         )}
//         {!loading && !error && movies.length > 0 ? (
//           <MovieList movies={movies} onFavorite={handleAddToFavorites} />
//         ) : (
//           !loading && <p>No movies found for the selected criteria.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Navbar from '../components/Navbar';
// import MovieList from '../components/MovieList';
// import GenreFilter from '../components/GenreFilter';
// import SortOptions from '../components/SortOptions';
// import { fetchMovies, fetchGenres, searchMovies, clearList, setSearchMode } from '../features/movies/moviesSlice';
// import { useFavorites } from '../hooks/useFavorites';
// import { debounce } from 'lodash';

// const Home = () => {
//   const dispatch = useDispatch();
//   const { list: movies, genres, loading, error, isSearchMode } = useSelector((state) => state.movies);
//   const { addFavorite, isFavorite } = useFavorites();

//   const [selectedGenres, setSelectedGenres] = useState([]);
//   const [sortBy, setSortBy] = useState('popularity.desc');
//   const [page, setPage] = useState(1);
//   const [query, setQuery] = useState('');
//   const [lastFetchParams, setLastFetchParams] = useState({ genres: '', sortBy: '', query: '', page: 1 });

//   // Fetch genres once on component mount
//   useEffect(() => {
//     if (genres.length === 0) {
//       dispatch(fetchGenres());
//     }
//   }, [dispatch, genres.length]);

//   // Fetch movies when genres, sort order, or page changes
//   useEffect(() => {
//     if (isSearchMode) return; // Skip this effect if in search mode

//     const genreString = selectedGenres.join(',');

//     // Avoid duplicate API calls by comparing with the last fetch parameters
//     if (
//       lastFetchParams.genres !== genreString ||
//       lastFetchParams.sortBy !== sortBy ||
//       lastFetchParams.page !== page
//     ) {
//       dispatch(fetchMovies({ genres: genreString, sortBy, page }));
//       setLastFetchParams({ genres: genreString, sortBy, query: '', page });
//     }
//   }, [selectedGenres, sortBy, page, dispatch, isSearchMode, lastFetchParams]);

//   // Handle infinite scroll
//   useEffect(() => {
//     const handleScroll = debounce(() => {
//       const bottom = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight;
//       if (bottom && !loading) {
//         setPage((prevPage) => prevPage + 1);
//       }
//     }, 200);

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [loading]);

//   // Handle search
//   useEffect(() => {
//     if (isSearchMode) {
//       // Avoid duplicate API calls by comparing with the last fetch parameters
//       if (lastFetchParams.query !== query || lastFetchParams.page !== page) {
//         dispatch(searchMovies({ query, page }));
//         setLastFetchParams({ genres: '', sortBy: '', query, page });
//       }
//     }
//   }, [query, page, dispatch, isSearchMode, lastFetchParams]);

//   const resetMovies = () => {
//     setSelectedGenres([]);
//     setSortBy('popularity.desc');
//     setQuery('');
//     setPage(1);
//     dispatch(clearList());
//     dispatch(setSearchMode(false)); // Exit search mode
//     dispatch(fetchMovies({ genres: '', sortBy: 'popularity.desc', page: 1 }));
//     setLastFetchParams({ genres: '', sortBy: 'popularity.desc', query: '', page: 1 });
//   };

//   const handleSearch = debounce((searchQuery) => {
//     setQuery(searchQuery);
//     setPage(1);
//     dispatch(clearList());
//     dispatch(setSearchMode(true)); // Enter search mode
//   }, 500);

//   const handleAddToFavorites = (movie) => {
//     if (isFavorite(movie.id)) {
//       alert(`${movie.title} is already in your favorites!`);
//       return;
//     }
//     addFavorite(movie);
//     alert(`${movie.title} has been added to your favorites!`);
//   };

//   const handleGenreChange = (genreId, isChecked) => {
//     setSelectedGenres((prev) =>
//       isChecked ? [...prev, genreId] : prev.filter((id) => id !== genreId)
//     );
//     setPage(1);
//     dispatch(clearList());
//   };

//   const handleSortChange = (sortOption) => {
//     setSortBy(sortOption);
//     setPage(1);
//     dispatch(clearList());
//   };

//   return (
//     <div>
//       <Navbar onSearch={handleSearch} resetMovies={resetMovies} />
//       <div className="container mx-auto mt-4">
//         <GenreFilter
//           genres={genres}
//           selectedGenres={selectedGenres}
//           onGenreChange={handleGenreChange}
//         />
//         <SortOptions sortBy={sortBy} onSortChange={handleSortChange} />

//         {loading && <p>Loading movies...</p>}
//         {error && (
//           <div className="text-red-500">
//             <p>Failed to load movies. Please try again later.</p>
//             <button onClick={resetMovies} className="bg-red-500 text-white p-2 rounded mt-2">
//               Retry
//             </button>
//           </div>
//         )}
//         {!loading && !error && movies.length > 0 ? (
//           <MovieList movies={movies} onFavorite={handleAddToFavorites} />
//         ) : (
//           !loading && <p>No movies found for the selected criteria.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Navbar from '../components/Navbar';
// import MovieList from '../components/MovieList';
// import GenreFilter from '../components/GenreFilter';
// import SortOptions from '../components/SortOptions';
// import { fetchMovies, fetchGenres, searchMovies, clearList, setSearchMode } from '../features/movies/moviesSlice';
// import { useFavorites } from '../hooks/useFavorites';
// import { debounce } from 'lodash';

// const Home = () => {
//   const dispatch = useDispatch();
//   const { list: movies, genres, loading, error, isSearchMode } = useSelector((state) => state.movies);
//   const { addFavorite, isFavorite } = useFavorites();

//   const [selectedGenres, setSelectedGenres] = useState([]);
//   const [sortBy, setSortBy] = useState('popularity.desc');
//   const [page, setPage] = useState(1);
//   const [query, setQuery] = useState('');
//   const [lastFetchParams, setLastFetchParams] = useState({ genres: '', sortBy: '', query: '', page: 1 });

//   // Fetch genres once on component mount
//   useEffect(() => {
//     if (genres.length === 0) {
//       dispatch(fetchGenres());
//     }
//   }, [dispatch, genres.length]);

//   // Fetch movies when genres, sort order, or page changes
//   useEffect(() => {
//     if (isSearchMode) return; // Skip this effect if in search mode

//     const genreString = selectedGenres.join(',');

//     // Avoid duplicate API calls by comparing with the last fetch parameters
//     if (
//       lastFetchParams.genres !== genreString ||
//       lastFetchParams.sortBy !== sortBy ||
//       lastFetchParams.page !== page
//     ) {
//       console.log("Fetching movies", { genres: genreString, sortBy, page });
//       dispatch(fetchMovies({ genres: genreString, sortBy, page }));
//       setLastFetchParams({ genres: genreString, sortBy, query: '', page });
//     }
//   }, [selectedGenres, sortBy, page, dispatch, isSearchMode, lastFetchParams]);

//   // Handle infinite scroll
//   useEffect(() => {
//     const handleScroll = debounce(() => {
//       const bottom = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight;
//       if (bottom && !loading) {
//         console.log("Infinite scroll - Incrementing page");
//         setPage((prevPage) => prevPage + 1);
//       }
//     }, 200);

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [loading]);

//   // Handle search
//   useEffect(() => {
//     if (isSearchMode) {
//       // Avoid duplicate API calls by comparing with the last fetch parameters
//       if (lastFetchParams.query !== query || lastFetchParams.page !== page ) {
//         console.log("Fetching more search results", { query, page });
//         if(query){
//           dispatch(searchMovies({ query, page }));
//         setLastFetchParams({ genres: '', sortBy: '', query, page });
//         }
        
//       }
//     }
//   }, [query, page, dispatch, isSearchMode, lastFetchParams]);

//   const resetMovies = () => {
//     setSelectedGenres([]);
//     setSortBy('popularity.desc');
//     setQuery('');
//     setPage(1);
//     dispatch(clearList());
//     dispatch(setSearchMode(false)); // Exit search mode
//   };

//   const handleSearch = debounce((searchQuery) => {
//     setQuery(searchQuery);
//     setPage(1);
//     dispatch(clearList());
//     dispatch(setSearchMode(true)); // Enter search mode
//   }, 500);

//   const handleAddToFavorites = (movie) => {
//     if (isFavorite(movie.id)) {
//       alert(`${movie.title} is already in your favorites!`);
//       return;
//     }
//     addFavorite(movie);
//     alert(`${movie.title} has been added to your favorites!`);
//   };

//   const handleGenreChange = (genreId, isChecked) => {
//     setSelectedGenres((prev) =>
//       isChecked ? [...prev, genreId] : prev.filter((id) => id !== genreId)
//     );
//     setPage(1);
//     dispatch(clearList());
//   };

//   const handleSortChange = (sortOption) => {
//     setSortBy(sortOption);
//     setPage(1);
//     dispatch(clearList());
//   };

//   return (
//     <div>
//       <Navbar onSearch={handleSearch} resetMovies={resetMovies} />
//       <div className="container mx-auto mt-4">
//         {!isSearchMode && (
//           <>
//             <GenreFilter
//               genres={genres}
//               selectedGenres={selectedGenres}
//               onGenreChange={handleGenreChange}
//             />
//             <SortOptions sortBy={sortBy} onSortChange={handleSortChange} />
//           </>
//         )}

//         {loading && <p>Loading movies...</p>}
//         {error && (
//           <div className="text-red-500">
//             <p>Failed to load movies. Please try again later.</p>
//             <button onClick={resetMovies} className="bg-red-500 text-white p-2 rounded mt-2">
//               Retry
//             </button>
//           </div>
//         )}
//         {!loading && !error && movies.length > 0 ? (
//           <MovieList movies={movies} onFavorite={handleAddToFavorites} />
//         ) : (
//           !loading && <p>No movies found for the selected criteria.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;




import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import MovieList from '../components/MovieList';
import GenreFilter from '../components/GenreFilter';
import SortOptions from '../components/SortOptions';
import { fetchMovies, fetchGenres, searchMovies, clearList, setSearchMode } from '../features/movies/moviesSlice';
import { debounce } from 'lodash';
import { FavoritesContext } from '../context/FavoritesContext'; // Import the FavoritesContext

const Home = () => {
  const dispatch = useDispatch();
  const { list: movies, genres, loading, error, isSearchMode } = useSelector((state) => state.movies);
  
  // Access context values
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [lastFetchParams, setLastFetchParams] = useState({ genres: '', sortBy: '', query: '', page: 1 });

  // Fetch genres once on component mount
  useEffect(() => {
    if (genres.length === 0) {
      dispatch(fetchGenres());
    }
  }, [dispatch, genres.length]);

  // Fetch movies when genres, sort order, or page changes
  useEffect(() => {
    if (isSearchMode) return; // Skip this effect if in search mode

    const genreString = selectedGenres.join(',');

    // Avoid duplicate API calls by comparing with the last fetch parameters
    if (
      lastFetchParams.genres !== genreString ||
      lastFetchParams.sortBy !== sortBy ||
      lastFetchParams.page !== page
    ) {
      console.log("Fetching movies", { genres: genreString, sortBy, page });
      dispatch(fetchMovies({ genres: genreString, sortBy, page }));
      setLastFetchParams({ genres: genreString, sortBy, query: '', page });
    }
  }, [selectedGenres, sortBy, page, dispatch, isSearchMode, lastFetchParams]);

  // Handle infinite scroll
  useEffect(() => {
    const handleScroll = debounce(() => {
      const bottom = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight;
      if (bottom && !loading) {
        console.log("Infinite scroll - Incrementing page");
        setPage((prevPage) => prevPage + 1);
      }
    }, 200);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  // Handle search
  useEffect(() => {
    if (isSearchMode) {
      // Avoid duplicate API calls by comparing with the last fetch parameters
      if (lastFetchParams.query !== query || lastFetchParams.page !== page ) {
        console.log("Fetching more search results", { query, page });
        if(query){
          dispatch(searchMovies({ query, page }));
          setLastFetchParams({ genres: '', sortBy: '', query, page });
        }
      }
    }
  }, [query, page, dispatch, isSearchMode, lastFetchParams]);

  const resetMovies = () => {
    setSelectedGenres([]);
    setSortBy('popularity.desc');
    setQuery('');
    setPage(1);
    dispatch(clearList());
    dispatch(setSearchMode(false)); // Exit search mode
  };

  const handleSearch = debounce((searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    dispatch(clearList());
    dispatch(setSearchMode(true)); // Enter search mode
  }, 500);

  const handleAddToFavorites = (movie) => {
    if (favorites.some(fav => fav.id === movie.id)) {
      alert(`${movie.title} is already in your favorites!`);
      return;
    }
    addFavorite(movie);
    alert(`${movie.title} has been added to your favorites!`);
  };

  const handleGenreChange = (genreId, isChecked) => {
    setSelectedGenres((prev) =>
      isChecked ? [...prev, genreId] : prev.filter((id) => id !== genreId)
    );
    setPage(1);
    dispatch(clearList());
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
    setPage(1);
    dispatch(clearList());
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} resetMovies={resetMovies} />
      <div className="container mx-auto mt-4">
        {!isSearchMode && (
          <>
            <GenreFilter
              genres={genres}
              selectedGenres={selectedGenres}
              onGenreChange={handleGenreChange}
            />
            <SortOptions sortBy={sortBy} onSortChange={handleSortChange} />
          </>
        )}

        {loading && <p>Loading movies...</p>}
        {error && (
          <div className="text-red-500">
            <p>Failed to load movies. Please try again later.</p>
            <button onClick={resetMovies} className="bg-red-500 text-white p-2 rounded mt-2">
              Retry
            </button>
          </div>
        )}
        {!loading && !error && movies.length > 0 ? (
          <MovieList movies={movies} onFavorite={handleAddToFavorites} />
        ) : (
          !loading && <p>No movies found for the selected criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
