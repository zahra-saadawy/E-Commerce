import React from 'react'
import Style from './CategorySlider.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function CategorySlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1
  };
   function getCategories(){
    return  axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
  let {isLoading, isFetching, isError, data} = useQuery('categories', getCategories)
  
  
  return <>
  
  {data?.data.data?
     <div className='py-3'>
      <Slider {...settings}>
     { data?.data.data.map((category)=><img height={200} key={category._id} src={category.image} className='w-100'/>)
     }
   </Slider>
     </div>
 :<></>}
  </>
}
