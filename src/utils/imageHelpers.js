// Simple image URL builder
export const buildImageUrl = (path, size = 'w500') => {
  if (!path) return null;
  
  // Ensure path starts with a slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  return `https://image.tmdb.org/t/p/${size}${cleanPath}`;
};

// Get optimal image size based on type and screen width
export const getOptimalImageSize = (type = 'poster') => {
  if (typeof window === 'undefined') {
    return type === 'poster' ? 'w342' : 'w780';
  }

  const width = window.innerWidth;
  
  if (type === 'poster') {
    if (width >= 1200) return 'w500';
    if (width >= 768) return 'w342';
    return 'w185';
  }
  
  if (type === 'backdrop') {
    if (width >= 1920) return 'original';
    if (width >= 1280) return 'w1280';
    if (width >= 768) return 'w780';
    return 'w300';
  }
  
  if (type === 'profile') {
    if (width >= 768) return 'w185';
    return 'w45';
  }
  
  return 'w500';
};

// Get optimized image URL
export const getOptimizedImageUrl = (path, type = 'poster') => {
  if (!path) return null;
  
  const size = getOptimalImageSize(type);
  return buildImageUrl(path, size);
};

// Fallback images
export const FALLBACK_IMAGES = {
  poster: 'https://via.placeholder.com/342x513/0d253f/ffffff?text=No+Poster',
  backdrop: 'https://via.placeholder.com/1280x720/0d253f/ffffff?text=No+Backdrop',
  profile: 'https://via.placeholder.com/185x278/0d253f/ffffff?text=No+Image',
};