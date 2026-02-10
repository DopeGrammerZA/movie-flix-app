import React from 'react';
import PropTypes from 'prop-types';
import './LoadingSpinner.css';

const LoadingSpinner = ({ fullScreen = false }) => {
  const containerClass = fullScreen ? 'spinner-fullscreen' : 'spinner-container';
  
  return (
    <div className={containerClass}>
      <div className="spinner"></div>
      <p className="spinner-text">Loading movies...</p>
    </div>
  );
};

LoadingSpinner.propTypes = {
  fullScreen: PropTypes.bool,
};

export default LoadingSpinner;