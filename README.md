# Movie Browser Application

## Overview

The Movie Browser Application is a responsive and user-friendly web application built using React, Redux, and Tailwind CSS. It allows users to browse movies, search for specific titles, filter movies by genre, sort them by popularity, and add movies to a favorites list. The application also features infinite scrolling and the use of the Context API to manage the favorites list.

## Features

- **Movie Listing:** Browse and view a list of movies with options to filter by genre and sort by popularity.
- **Search Functionality:** Search for specific movies using the search bar, with debounced API calls for efficiency.
- **Infinite Scrolling:** Automatically load more movies as the user scrolls down the page.
- **Favorites Management:** Add movies to a favorites list, remove them, and view the list in a dedicated section. The favorite movies are stored in localStorage.
- **Context API for Favorites:** Manage the favorites list using the Context API, providing a global state for the favorites across the application.
- **Responsive Design:** The application is mobile-friendly and adapts to different screen sizes.
- **Dark Theme with Tailwind CSS:** The application uses a dark theme with customized colors provided by Tailwind CSS.

## Project Structure

```plaintext
movie-browser-app/
│
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   └── logo.svg
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── MovieList.jsx
│   │   ├── GenreFilter.jsx
│   │   ├── SortOptions.jsx
│   │   └── MovieCard.jsx
│   ├── context/
│   │   └── FavoritesContext.js
│   ├── features/
│   │   ├── movies/
│   │   │   └── moviesSlice.js
│   ├── hooks/
│   │   └── useFavorites.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Favorites.jsx
│   ├── App.jsx
│   └── index.jsx
├── .gitignore
├── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/movie-browser-app.git
   cd movie-browser-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**

   ```bash
   npm start
   # or
   yarn start
   ```

   The application will be available at `http://localhost:3000`.

### Build for Production

To create a production build, run:

```bash
npm run build
# or
yarn build
```

The production-ready files will be generated in the `build/` directory.

## Usage

### Home Page

- **Movie Listing:** On initial load, movies are displayed in descending order of popularity.
- **Filter by Genre:** Use the genre filter to refine the movie list.
- **Sort by Popularity:** Use the sort options to reorder the list by popularity.
- **Infinite Scrolling:** Scroll down to load more movies automatically.

### Search Functionality

- **Search Bar:** Use the search bar to find specific movies by title. The API call is debounced to prevent excessive requests.
- **Search Mode:** When searching, the application enters search mode and only displays results matching the query. Filtering and sorting can be applied to the search results as well.

### Favorites

- **Add to Favorites:** Click on the "Add to Favorites" button on any movie card to add it to your favorites list.
- **View Favorites:** Access the favorites page from the navbar to view all the movies you have added.
- **Remove from Favorites:** Click on the "Remove from Favorites" button to remove a movie from your favorites list.
- **Favorites Badge:** The navbar displays a heart icon with a badge showing the current number of favorite movies.

### Context API for Favorites

The `FavoritesContext` provides a global state for managing the favorites list across the entire application. This ensures that the favorite movies are consistently updated and available wherever needed.

## Documentation

### 1. **Navbar Component:**

   - The `Navbar` component includes a search bar and links to the home and favorites pages.
   - A heart icon with a badge displays the number of favorite movies.

### 2. **Home Component:**

   - The `Home` component handles movie listing, filtering, sorting, and searching.
   - Uses Redux for managing movie data and the Context API for managing favorites.
   - Includes infinite scrolling to load more movies as the user scrolls.

### 3. **Favorites Component:**

   - The `Favorites` component displays the list of favorite movies.
   - Uses the Context API to access and update the favorite movies.

### 4. **MovieCard Component:**

   - Displays individual movie details and buttons to add or remove movies from the favorites list.
   - The `MovieCard` is designed to be responsive, with special attention to mobile layouts.

### 5. **GenreFilter and SortOptions Components:**

   - These components provide UI controls for filtering movies by genre and sorting them by popularity.

## Future Enhancements

- **Pagination:** Implement a more robust pagination system for handling large datasets.
- **User Authentication:** Add user login and personalized movie recommendations.
- **Accessibility:** Further improve accessibility features, including keyboard navigation and screen reader support.

## Acknowledgements

- The Movie Database (TMDb) for the movie data.
- Lottie for providing high-quality animations.

---

This README file provides comprehensive documentation of the Movie Browser Application, covering the setup, usage, and key features implemented in alignment with the project requirements.
