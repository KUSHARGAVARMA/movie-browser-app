import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Utility function for retrying API calls
const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
  try {
    return await axios.get(url);
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry(url, retries - 1, delay * 2); // Exponential backoff
    } else {
      throw error;
    }
  }
};

// Thunk to fetch movies with optional filtering and sorting
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ genres = '', sortBy = 'popularity.desc', page = 1 }) => {
    const response = await fetchWithRetry(
      `https://api.themoviedb.org/3/discover/movie?api_key=fa2b4e7cfadacfcdf68aa1c9739a609e&with_genres=${genres}&sort_by=${sortBy}&page=${page}`
    );
    return response.data.results;
  }
);

// Thunk to search movies by query
export const searchMovies = createAsyncThunk('movies/searchMovies', async ({ query, page = 1 }) => {
  const response = await fetchWithRetry(
    `https://api.themoviedb.org/3/search/movie?api_key=fa2b4e7cfadacfcdf68aa1c9739a609e&query=${query}&page=${page}`
  );
  return response.data.results;
});

// Thunk to fetch genres
export const fetchGenres = createAsyncThunk('movies/fetchGenres', async (_, { getState }) => {
  const { movies } = getState();
  if (movies.genres.length > 0) {
    return movies.genres; // Return cached genres if already fetched
  }
  
  const response = await fetchWithRetry(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=fa2b4e7cfadacfcdf68aa1c9739a609e'
  );
  return response.data.genres;
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    genres: [],
    loadingMovies: false,
    loadingGenres: false,
    loadingSearch: false,
    isSearchMode: false, // Track whether we're in search mode
    errorMovies: null,
    errorGenres: null,
    errorSearch: null,
  },
  reducers: {
    clearList: (state) => {
      state.list = [];
    },
    setSearchMode: (state, action) => {
      state.isSearchMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Movies
      .addCase(fetchMovies.pending, (state) => {
        state.loadingMovies = true;
        state.errorMovies = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loadingMovies = false;
        state.list = [...state.list, ...action.payload]; // Append results for pagination
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loadingMovies = false;
        state.errorMovies = action.error.message;
      })

      // Search Movies
      .addCase(searchMovies.pending, (state) => {
        state.loadingSearch = true;
        state.errorSearch = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loadingSearch = false;
        state.list = [...state.list, ...action.payload]; // Append results for pagination
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loadingSearch = false;
        state.errorSearch = action.error.message;
      })

      // Fetch Genres
      .addCase(fetchGenres.pending, (state) => {
        state.loadingGenres = true;
        state.errorGenres = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.loadingGenres = false;
        state.genres = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.loadingGenres = false;
        state.errorGenres = action.error.message;
      });
  },
});

export const { clearList, setSearchMode } = moviesSlice.actions;

export default moviesSlice.reducer;
