import React, { useState } from 'react';
import Slick from 'react-slick';
import Link from 'next/link';
import PropTypes from 'prop-types';

const Slider = ({ images }) => {
  const [settings, setSettings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  return (
    <>
      <Slick {...settings}>
        {images.map(image => {
          return (
            <div className="menu" key={image.id}>
              <Link href="/menu">
                <a>
                  <img className="menu-image" src={image.url} alt={image.alt} />
                </a>
              </Link>
              <span className="menu-text">{image.alt}</span>
            </div>
          );
        })}
      </Slick>
    </>
  );
};

Slider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Slider;
