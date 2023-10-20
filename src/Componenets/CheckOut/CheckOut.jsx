import React, { useContext } from 'react'
import Style from './CheckOut.module.css';
import { Formik, useFormik } from 'formik';
import { cartContext } from '../../Context/CartContext';


export default function CheckOut() {
  let {onlinePayment, cartId}= useContext(cartContext)
  async function handleSubmit(values){
    let response = await onlinePayment(cartId,values);
    console.log (response?.data.session.url)
    window.location.href= response?.data.session.url;
  }
  let formik = useFormik({
    initialValues: {
    details: '',
    phone: '',
    city:''
    },
    onSubmit: handleSubmit

  })
  return <>
  <div className="container ">
    <h2 className='text-main mt-5'>Your Shipping Information</h2>
    <form onSubmit={formik.handleSubmit} className='d-flex flex-column my-5'>
      <label htmlFor="details" className='text-main'>Details: </label>

      <input value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className='from-control mb-2 py-5 rounded-3' name='details' id='details' style={{ border: ' 1px solid #074507' }}
 />
      
      <label htmlFor="phone"  className='text-main'>Phone: </label>
      <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" className='from-control mb-2 py-1 rounded-3' name='phone' id='phone' style={{ border: ' 1px solid #074507' }}/>
      
      <label htmlFor="city"  className='text-main'>City: </label>
      <input value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className='from-control mb-2 py-1 rounded-3' name='city' id='city' style={{ border: ' 1px solid #074507' }} />

      
      <button type='submit'  className=" w-25 btn text-center bg-main font-sm  py-2 px-2 border-0 text-white mt-3">
            Proceed to pay
      </button>
    </form>
  </div>
  </>
}
