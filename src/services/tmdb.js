import api from './api';

export const tmdbService = {
  getPopularMovies: (page = 1) => 
    api.get('/movie/popular', { params: { page } }),
  
  getMovieDetails: (movieId) => 
    api.get(`/movie/${movieId}`),
  
  getMovieCredits: (movieId) => 
    api.get(`/movie/${movieId}/credits`),
  
  getSimilarMovies: (movieId) => 
    api.get(`/movie/${movieId}/similar`),
  
  searchMovies: (query, page = 1) => 
    api.get('/search/movie', { params: { query, page } }),
  
  getGenres: () => 
    api.get('/genre/movie/list'),
};

export default tmdbService;