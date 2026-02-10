import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { tmdbService } from '../../services/tmdb';
import { IMAGE_BASE_URL } from '../../utils/constants';
import LoadingSpinner from '../common/LoadingSpinner';
import './CastList.css';

const CastList = ({ movieId }) => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoading(true);
        const data = await tmdbService.getMovieCredits(movieId);
        setCast(data.cast.slice(0, 10)); // Show top 10 cast members
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchCast();
    }
  }, [movieId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="cast-error">Failed to load cast</div>;
  }

  if (cast.length === 0) {
    return <div className="cast-empty">No cast information available</div>;
  }

  return (
    <div className="cast-list">
      {cast.map((person) => (
        <div key={person.id} className="cast-card">
          <div className="cast-image">
            <img
              src={
                person.profile_path
                  ? `${IMAGE_BASE_URL}/w185${person.profile_path}`
                  : 'https://via.placeholder.com/185x278/0d253f/ffffff?text=No+Image'
              }
              alt={person.name}
              loading="lazy"
            />
          </div>
          <div className="cast-info">
            <h4 className="cast-name">{person.name}</h4>
            <p className="cast-character">{person.character}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

CastList.propTypes = {
  movieId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default CastList;