import React, { useContext } from 'react'
import Style from './PorductDetails.module.css';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { cartContext } from '../../Context/CartContext';

export default function PorductDetails() {

  const { addToCart } = useContext(cartContext);
async function addProduct(productId) {
    try {
      const response = await addToCart(productId); // Await the Axios request
      if (response.data.status ==='success'){
        toast.success('product added successfuly');
        console.log(response.data)
      }
    } catch (error) {
      // Handle the error, display a message, or perform other actions
      console.error('Error while making the request ughhhhhh:', error);
    }}

  let {id} = useParams();
function getProductDetails(id){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
}
let {isLoading, data, isFetching}= useQuery('productDetails', ()=>getProductDetails(id));
// console.log(data?.data.data)
  return <>
  {data?.data.data? <div className='row py-2 align-items-center'>
  <div className='col-md-4'>
    <img src={data?.data.data.imageCover} alt={data?.data.data.title} className='w-100'/>
  </div>
  <div className='col-md-8'>
    <h2 className='h5 fw-bold'>{data?.data.data.title}</h2>
    <p>{data?.data.data.description}</p>
    <h6 className='text-main'>{data?.data.data.category.name}</h6>
    <h6 className='text-main'>Price: {data?.data.data.price}EGP</h6>
    <div className='d-felx justify-content-between'>
        <span className='me-5'>rated {data?.data.data.ratingsQuantity} times</span>
        <span><i className='fas fa-star rating-color'></i>{data?.data.data.ratingsAverage}</span>
      
    </div>
    <button onClick={()=>addProduct(id)} className='btn bg-main text-white w-50 mt-3'>Add to cart</button>
  </div>
  </div>:<></>}
    <h1>PorductDetails</h1> 
  </>
}
