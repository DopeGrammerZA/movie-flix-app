import React, { useState, useEffect } from 'react';
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

  const fetchMovies = async (pageNum = 1, query = '') => {
    try {
      setLoading(true);
      let data;
      
      if (query.trim()) {
        data = await tmdbService.searchMovies(query, pageNum);
      } else {
        data = await tmdbService.getPopularMovies(pageNum);
      }
      
      if (pageNum === 1) {
        setMovies(data.results);
      } else {
        setMovies(prev => [...prev, ...data.results]);
      }
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load movies');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
    fetchMovies(1, query);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage, searchQuery);
  };

  useEffect(() => {
    fetchMovies(1, '');
  }, []);

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