import React from 'react';
import '../assets/styles/Carousel.scss';

const Carousel = ({ children }) => {
  return (
    <div className='player--carousel'>
      { children }
    </div>
  );
};

export default Carousel;
