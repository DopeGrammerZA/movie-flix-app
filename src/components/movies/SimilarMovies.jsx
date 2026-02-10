import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { tmdbService } from '../../services/tmdb';
import MovieCard from './MovieCard';
import LoadingSpinner from '../common/LoadingSpinner';
import './SimilarMovies.css';

const SimilarMovies = ({ movieId }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        setLoading(true);
        const data = await tmdbService.getSimilarMovies(movieId);
        setMovies(data.results.slice(0, 6)); // Show 6 similar movies
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchSimilarMovies();
    }
  }, [movieId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="similar-error">Failed to load similar movies</div>;
  }

  if (movies.length === 0) {
    return <div className="similar-empty">No similar movies found</div>;
  }

  return (
    <div className="similar-movies">
      <div className="similar-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

SimilarMovies.propTypes = {
  movieId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default SimilarMovies;