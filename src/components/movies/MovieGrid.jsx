import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import './MovieGrid.css';

const MovieGrid = ({ movies, loading, error, onLoadMore, page = 1 }) => {
  if (loading && movies.length === 0) {
    return <LoadingSpinner />;
  }

  if (error && movies.length === 0) {
    return <ErrorMessage message={error} onRetry={() => onLoadMore(1)} />;
  }

  return (
    <div className="movie-grid">
      {movies.length === 0 ? (
        <div className="empty-state">
          <h3>No movies found</h3>
          <p>Try a different search term</p>
        </div>
      ) : (
        <>
          <div className="grid">
            {movies.map((movie) => (
              <MovieCard key={`${movie.id}-${page}`} movie={movie} />
            ))}
          </div>
          
          {!loading && movies.length > 0 && (
            <div className="load-more">
              <button onClick={onLoadMore} className="load-more-button">
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

MovieGrid.propTypes = {
  movies: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onLoadMore: PropTypes.func,
  page: PropTypes.number,
};

export default MovieGrid;