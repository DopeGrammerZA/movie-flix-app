import React from 'react';
import PropTypes from 'prop-types';
import { formatRuntime, formatCurrency, formatDate } from '../../utils/formatters';
import { IMAGE_BASE_URL, BACKDROP_SIZES } from '../../utils/constants';
import './MovieDetail.css';

const MovieDetail = ({ movie }) => {
  const backdropUrl = movie.backdrop_path
    ? `${IMAGE_BASE_URL}${BACKDROP_SIZES.original}${movie.backdrop_path}`
    : null;

  const ratingPercentage = Math.round(movie.vote_average * 10);
  const ratingColor = ratingPercentage >= 70 ? 'high' : ratingPercentage >= 50 ? 'medium' : 'low';

  return (
    <div className="movie-detail">
      {backdropUrl && (
        <div className="backdrop">
          <img
            src={backdropUrl}
            alt={`${movie.title} backdrop`}
            className="backdrop-image"
          />
          <div className="backdrop-overlay" />
        </div>
      )}

      <div className="detail-content">
        <div className="poster-container">
          <img
            src={`${IMAGE_BASE_URL}/w342${movie.poster_path}`}
            alt={`${movie.title} poster`}
            className="detail-poster"
          />
        </div>

        <div className="detail-info">
          <h1 className="detail-title">
            {movie.title} <span className="release-year">
              ({movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'})
            </span>
          </h1>
          
          {movie.tagline && (
            <p className="tagline">"{movie.tagline}"</p>
          )}

          <div className="meta-info">
            <div className={`rating-circle rating-${ratingColor}`}>
              {ratingPercentage}%
            </div>
            <span className="meta-item">{formatDate(movie.release_date)}</span>
            {movie.runtime > 0 && (
              <span className="meta-item">{formatRuntime(movie.runtime)}</span>
            )}
          </div>

          <div className="genres">
            {movie.genres?.map(genre => (
              <span key={genre.id} className="genre">
                {genre.name}
              </span>
            ))}
          </div>

          <div className="overview-section">
            <h3>Overview</h3>
            <p className="overview">
              {movie.overview || 'No overview available for this movie.'}
            </p>
          </div>

          {(movie.budget > 0 || movie.revenue > 0) && (
            <div className="financials">
              {movie.budget > 0 && (
                <div className="financial-item">
                  <span className="financial-label">Budget</span>
                  <span className="financial-value">{formatCurrency(movie.budget)}</span>
                </div>
              )}
              {movie.revenue > 0 && (
                <div className="financial-item">
                  <span className="financial-label">Revenue</span>
                  <span className="financial-value">{formatCurrency(movie.revenue)}</span>
                </div>
              )}
            </div>
          )}

          {movie.homepage && (
            <a
              href={movie.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="homepage-link"
            >
              🌐 Official Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

MovieDetail.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    backdrop_path: PropTypes.string,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number.isRequired,
    runtime: PropTypes.number,
    release_date: PropTypes.string,
    tagline: PropTypes.string,
    overview: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
    budget: PropTypes.number,
    revenue: PropTypes.number,
    homepage: PropTypes.string,
  }).isRequired,
};

export default MovieDetail;