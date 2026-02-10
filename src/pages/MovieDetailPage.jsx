import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tmdbService } from '../services/tmdb';
import MovieDetail from '../components/movies/MovieDetail';
import CastList from '../components/movies/CastList';
import SimilarMovies from '../components/movies/SimilarMovies';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import './MovieDetailPage.css';

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await tmdbService.getMovieDetails(id);
        setMovie(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error || !movie) {
    return (
      <ErrorMessage
        message={error || 'Movie not found'}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="movie-detail-page">
      <button onClick={handleBack} className="back-button">
        ← Back to Movies
      </button>

      <MovieDetail movie={movie} />

      <div className="detail-sections">
        <section className="detail-section">
          <h2 className="section-title">Cast</h2>
          <CastList movieId={id} />
        </section>

        <section className="detail-section">
          <h2 className="section-title">Similar Movies</h2>
          <SimilarMovies movieId={id} />
        </section>
      </div>
    </div>
  );
};

export default MovieDetailPage;