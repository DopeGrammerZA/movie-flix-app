import React from 'react';
// import MovieGrid from '../components/movies/MovieGrid';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <section className="hero-section">
        <h1 className="hero-title">Discover Amazing Movies</h1>
        <p className="hero-subtitle">
          Explore thousands of movies, find ratings, cast info, and more
        </p>
      </section>
      
      <section className="movies-section">
        <h2 className="section-title">Popular Movies</h2>
        {/* <MovieGrid /> */}
      </section>
    </div>
  );
};

export default HomePage;