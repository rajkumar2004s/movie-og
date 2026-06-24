import React from 'react';
import UpcomingMovies from '../UpcomingMovies/UpcomingMovies';
import TrendingSection from '../TrendingSection/TrendingSection';
import './HomePage.css'
import HeroSection from '../HeroSection/HeroSection';
import Navbar from '../Navbar/Navbar';

const HomePage = () => {
  return (
    <div className="main-content">
        <Navbar />
      <HeroSection/>
      <UpcomingMovies />
      <TrendingSection />
    </div>
  );
};

export default HomePage;
