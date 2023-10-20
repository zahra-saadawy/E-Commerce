import React from 'react'
import Style from './MainSlider.module.css';
import slide1 from '../../Assets/Images/main1_.jpg'
import slide2 from '../../Assets/Images/main2.jpg'
import slide3 from '../../Assets/Images/main3.jpg'
import slide4 from '../../Assets/Images/main4.jpg'

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return <>
  <div className="row d-flex justify-content-center">
    <div className="col-md-3">
    <Slider {...settings}>

   < img  src={slide1} alt="slide" className='w-100=' />
    < img  src={slide2} alt="slide" className='w-100' />

    </Slider>
    </div>

    <div className="col-md-3">
    < img  src={slide3} alt="slide" className='w-100' />
    < img  src={slide4} alt="slide" className='w-100' />
    </div>
  </div>
     </>
}
