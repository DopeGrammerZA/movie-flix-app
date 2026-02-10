export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Default sizes if we can't fetch configuration
export const POSTER_SIZES = {
  sm: 'w185',
  md: 'w342',
  lg: 'w500',
  xl: 'w780',
  original: 'original'
};

export const BACKDROP_SIZES = {
  sm: 'w300',
  md: 'w780',
  lg: 'w1280',
  original: 'original',
};

export const PROFILE_SIZES = {
  sm: 'w45',
  md: 'w185',
  lg: 'h632',
  original: 'original',
};

// Fallback images
export const FALLBACK_POSTER = 'https://via.placeholder.com/342x513/0d253f/ffffff?text=No+Poster';
export const FALLBACK_BACKDROP = 'https://via.placeholder.com/1280x720/0d253f/ffffff?text=No+Backdrop';
export const FALLBACK_PROFILE = 'https://via.placeholder.com/185x278/0d253f/ffffff?text=No+Image';