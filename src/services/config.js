import api from './api';
import { POSTER_SIZES, BACKDROP_SIZES, PROFILE_SIZES } from '../utils/constants';

let tmdbConfig = null;

export const configService = {
  // Fetch and cache TMDB configuration
  getConfig: async () => {
    if (tmdbConfig) {
      return tmdbConfig;
    }

    try {
      const data = await api.get('/configuration');
      tmdbConfig = data;
      return tmdbConfig;
    } catch (error) {
      console.error('Failed to fetch TMDB configuration:', error);
      // Return fallback config
      return {
        images: {
          secure_base_url: 'https://image.tmdb.org/t/p',
          poster_sizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
          backdrop_sizes: ['w300', 'w780', 'w1280', 'original'],
          profile_sizes: ['w45', 'w185', 'h632', 'original'],
        }
      };
    }
  },

  // Get image URL with optimal size
  getImageUrl: (path, type = 'poster', size = 'md') => {
    if (!path) return null;

    const sizes = {
      poster: POSTER_SIZES,
      backdrop: BACKDROP_SIZES,
      profile: PROFILE_SIZES,
    };

    const sizeKey = sizes[type]?.[size] || 'w500';
    return `https://image.tmdb.org/t/p/${sizeKey}${path}`;
  },

  // Get optimal poster size based on screen width
  getOptimalPosterSize: () => {
    if (typeof window === 'undefined') return 'md';
    const width = window.innerWidth;
    if (width >= 1200) return 'lg';
    if (width >= 768) return 'md';
    return 'sm';
  },

  // Get optimal backdrop size
  getOptimalBackdropSize: () => {
    if (typeof window === 'undefined') return 'md';
    const width = window.innerWidth;
    if (width >= 1920) return 'original';
    if (width >= 1280) return 'lg';
    return 'md';
  },
};

export default configService;