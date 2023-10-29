import React, { useContext, useState } from 'react'
import Style from './Login.module.css';
import {useFormik} from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {UserContext} from '../../Context/UserContext';




export default function Login() {

  let {setUserToken} = useContext(UserContext);

  const [error, setError]= useState(null);
  let navigate = useNavigate();


  async function submitLogin(values){
    let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).catch(
    (err)=>{
      setError(err.response.data.message);
      console.log(err.response)
    }
    )
    console.log(response);

    if(response.data.message ==="success"){
      localStorage.setItem('userToken', response.data.token);
      setUserToken(response.data.token);
      console.log(response.data.token);
      navigate( '/home');
    }
  }


  

  let formik = useFormik({
    initialValues : {
      
      email:'',
      password:'',
      
    },
     onSubmit: submitLogin
  });

  return <>
  <div className="container my-5 py-3">
    {error!== null?   <div className="alert alert-danger">{error}</div>: <></>}
  <h2 className='mt-3 fw-bold'>Log In</h2>
  <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email" className="form-label">Email:</label>
      <input type="email" className="form-control mb-3" id="email"  name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
      {formik.errors.email&& formik.touched.email? <div className="alert alert-danger ">{formik.errors.email}</div> : <></>}

      <label htmlFor="password" className="form-label">Password:</label>
      <input type="password" className="form-control mb-3" id="password"  name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
      {formik.errors.password&& formik.touched.password? <div className="alert alert-danger ">{formik.errors.password}</div> : <></>}

     
      <button disabled={!formik.isValid || !formik.dirty} type='submit' className='btn bg-main text-white mb-3'>Login</button>
      <br />
      <Link to='/register' className='text-success pt-5'>Don't have an account? Register now</Link>
      <br />
      <br />
      <Link to='/forgotpassword' className='text-danger pt-5' >forgot your password?</Link>

  </form>
  </div>
  </>
}
