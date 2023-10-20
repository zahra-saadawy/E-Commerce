import React from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function Brand() {
  function getBrands(){
    return axios.get ('https://ecommerce.routemisr.com/api/v1/brands')
    
  }
  let {data, isLoading} = useQuery('brands', getBrands) 
 console.log(data)

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
    {data?.data.data? data.data.data.map((product)=> <div key= {product.id} className='col-md-3 ' >

      <div className="product cursor-pointer my-3 mx-2 text-center rounded border product">
        <img className='w-100' src={product.image} alt='' />
        <h3 className="text-dark font-sm fw-bolder text-center pb-3" >{product.name}</h3>
        
      </div>
      
    </div>
    
    ):''}
  </div>
</div>}
 
    </>
}
