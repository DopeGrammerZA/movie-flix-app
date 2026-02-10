import React, { useState, useEffect, useCallback } from 'react';
import { tmdbService } from '../services/tmdb';
import MovieGrid from '../components/movies/MovieGrid';
import SearchBar from '../components/movies/SearchBar';
import './HomePage.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [genres, setGenres] = useState([]);

  // Fetch genres on mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await tmdbService.getGenres();
        setGenres(data.genres);
      } catch (err) {
        console.error('Failed to load genres:', err);
      }
    };

    fetchGenres();
  }, []);

  // Memoize fetchMovies to avoid infinite re-renders
  const fetchMovies = useCallback(async (pageNum = 1, query = '') => {
    try {
      setLoading(true);
      let data;
      
      if (query.trim()) {
        data = await tmdbService.searchMovies(query, pageNum);
      } else {
        data = await tmdbService.getPopularMovies(pageNum);
      }
      
      // Add genre names to movies
      const moviesWithGenres = data.results.map(movie => ({
        ...movie,
        genre_names: movie.genre_ids?.map(id => {
          const genre = genres.find(g => g.id === id);
          return genre ? genre.name : id;
        }) || []
      }));
      
      if (pageNum === 1) {
        setMovies(moviesWithGenres);
      } else {
        setMovies(prev => [...prev, ...moviesWithGenres]);
      }
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load movies');
    } finally {
      setLoading(false);
    }
  }, [genres]); // Add genres as dependency

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setPage(1);
    fetchMovies(1, query);
  }, [fetchMovies]);

  const handleLoadMore = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage, searchQuery);
  }, [page, searchQuery, fetchMovies]);

  // Initial load
  useEffect(() => {
    fetchMovies(1, '');
  }, [fetchMovies]); // Now fetchMovies is stable

  return (
    <div className="homepage">
      <section className="hero-section">
        <h1 className="hero-title">Discover Amazing Movies</h1>
        <p className="hero-subtitle">
          Explore thousands of movies, find ratings, cast info, and more
        </p>
        
        <div className="search-container-hero">
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>
      
      <section className="movies-section">
        <h2 className="section-title">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Movies'}
        </h2>
        <MovieGrid 
          movies={movies} 
          loading={loading} 
          error={error}
          onLoadMore={handleLoadMore}
          page={page}
        />
      </section>
    </div>
  );
};

export default HomePage;