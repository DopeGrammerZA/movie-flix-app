import React, { useState, useEffect } from 'react';
import { tmdbService } from '../../services/tmdb';
import MovieCard from './MovieCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import './MovieGrid.css';

const MovieGrid = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchMovies = async (pageNum = 1) => {
    try {
      setLoading(true);
      const data = await tmdbService.getPopularMovies(pageNum);
      
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

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage);
  };

  useEffect(() => {
    fetchMovies(1);
  }, []);

  if (loading && movies.length === 0) {
    return <LoadingSpinner />;
  }

  if (error && movies.length === 0) {
    return <ErrorMessage message={error} onRetry={() => fetchMovies(1)} />;
  }

  return (
    <div className="movie-grid">
      {movies.length === 0 ? (
        <div className="empty-state">
          <h3>No movies found</h3>
          <p>Try again later</p>
        </div>
      ) : (
        <>
          <div className="grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          
          {!loading && movies.length > 0 && (
            <div className="load-more">
              <button onClick={handleLoadMore} className="load-more-button">
                Load More Movies
              </button>
            </div>
          )}
          
          {loading && movies.length > 0 && (
            <div className="loading-more">
              <LoadingSpinner />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MovieGrid;