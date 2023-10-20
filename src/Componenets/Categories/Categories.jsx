import React from 'react'
import Style from './Categories.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function Categories() {
  function getCategories(){
    return axios.get ('https://ecommerce.routemisr.com/api/v1/categories')
  }
  let {data, isLoading} = useQuery('categories', getCategories) 
 

  return <>
  {isLoading? <div className='w-100 py-5 d-flex justify-content-center align-items-center'>
  <BallTriangle
     height={100}
     width={100}
     radius={5}
     color="#4fa94d"
     ariaLabel="ball-triangle-loading"
     wrapperClass={{}}
     wrapperStyle=""
     visible={true}
/>
  </div>:
  <div className="container py-2">
  <div className="row">
    {data?.data.data? data.data.data.map((product)=> <div key= {product.id} className='col-md-4 ' >

      <div className="product cursor-pointer my-3 mx-2 text-center rounded border product">
        <img className='w-100' src={product.image} alt='' height={300}/>
        <span className='text-main fs-4 fw-bolder text-center py-5 my-2'>{product.name}</span>
        
      </div>
      
    </div>
    
    ):''}
  </div>
</div>}
 
    </>
}
