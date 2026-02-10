import api from './api';
import { configService } from './config';

export const tmdbService = {
  // Initialize configuration
  initialize: async () => {
    try {
      await configService.getConfig();
      console.log('TMDB configuration loaded');
    } catch (error) {
      console.error('Failed to initialize TMDB config:', error);
    }
  },

  getPopularMovies: async (page = 1) => {
    const data = await api.get('/movie/popular', { params: { page } });
    return {
      ...data,
      results: data.results.map(movie => ({
        ...movie,
        poster_url: configService.getImageUrl(movie.poster_path, 'poster', 'md'),
        backdrop_url: configService.getImageUrl(movie.backdrop_path, 'backdrop', 'md'),
      }))
    };
  },
  
  getMovieDetails: async (movieId) => {
    const data = await api.get(`/movie/${movieId}`);
    return {
      ...data,
      poster_url: configService.getImageUrl(data.poster_path, 'poster', 'lg'),
      backdrop_url: configService.getImageUrl(data.backdrop_path, 'backdrop', 'original'),
    };
  },
  
  getMovieCredits: async (movieId) => {
    const data = await api.get(`/movie/${movieId}/credits`);
    return {
      ...data,
      cast: data.cast.map(person => ({
        ...person,
        profile_url: configService.getImageUrl(person.profile_path, 'profile', 'md'),
      }))
    };
  },
  
  getSimilarMovies: async (movieId) => {
    const data = await api.get(`/movie/${movieId}/similar`);
    return {
      ...data,
      results: data.results.map(movie => ({
        ...movie,
        poster_url: configService.getImageUrl(movie.poster_path, 'poster', 'md'),
      }))
    };
  },
  
  searchMovies: async (query, page = 1) => {
    const data = await api.get('/search/movie', { params: { query, page } });
    return {
      ...data,
      results: data.results.map(movie => ({
        ...movie,
        poster_url: configService.getImageUrl(movie.poster_path, 'poster', 'md'),
      }))
    };
  },
  
  getGenres: () => 
    api.get('/genre/movie/list'),
};

export default tmdbService;