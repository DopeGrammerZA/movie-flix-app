import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatters';
import { FALLBACK_POSTER } from '../../utils/constants';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_url || FALLBACK_POSTER;
  
  const ratingPercentage = Math.round(movie.vote_average * 10);
  
  const getRatingColor = () => {
    if (ratingPercentage >= 70) return 'rating-high';
    if (ratingPercentage >= 50) return 'rating-medium';
    return 'rating-low';
  };

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="card-image">
        <img
          src={posterUrl}
          alt={`${movie.title} poster`}
          loading="lazy"
          className="poster"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = FALLBACK_POSTER;
          }}
        />
        <div className={`rating-badge ${getRatingColor()}`}>
          {ratingPercentage}%
        </div>
      </div>
      
      <div className="card-content">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-date">{formatDate(movie.release_date)}</p>
        <div className="movie-genres">
          {movie.genre_names?.slice(0, 2).map((genre, index) => (
            <span key={index} className="genre-tag">
              {genre}
            </span>
          )) || movie.genre_ids?.slice(0, 2).map((genreId) => (
            <span key={genreId} className="genre-tag">
              {genreId}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_url: PropTypes.string,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number.isRequired,
    release_date: PropTypes.string,
    genre_ids: PropTypes.arrayOf(PropTypes.number),
    genre_names: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default MovieCard;