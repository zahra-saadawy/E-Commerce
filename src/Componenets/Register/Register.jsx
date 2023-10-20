import React, { useState } from 'react'
import Style from './Register.module.css';
import {useFormik} from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const [error, setError]= useState(null);
  let navigate = useNavigate();
   async function submitRegister(values){
    let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).catch(
    (err)=>{
      setError(err.response.data.message);
      console.log(err.response)
    }
    )
    console.log(response);

    if(response.data.message ==="success"){
      navigate( '/login');
    }
  }


  function validate(values){
    let errors ={};
    // Validate Name
    if(!values.name){
      errors.name = "Name is required";
    }
    else if(values.name.length<3){
      errors.name ="Name  minimum length is 3";
    }
    else if (values.name.length>12){
      errors.name="Name maximum length is 10"
    }
    // Validate Phone
    const phonePattern = /^(?:\+20|0)?1\d{9}$/;
    if(!values.phone){
      errors.phone = " Phone is required";
    }
    else if (!phonePattern.test(values.phone)){
      errors.phone= "Invalid phone number"; 
    }
    // Validate Email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!values.email){
      errors.email= "Email is required";
    }
    else if(!emailPattern.test(values.email)){
      errors.email = "Invalid email"
    }
    // Validate Password
    const passwordPattern = /^[a-zA-Z][a-zA-Z0-9]{5,8}$/;
    if (!values.password) {
      errors.password = "Password is required";
    } else if (!passwordPattern.test(values.password)) {
      errors.password = `-Password must start with a letter 
      -Password must be between 6 and 9 characters long
      -Password must be containing only letters and numbers.`;
    }
    

    // Validate rePassword
    if(values.rePassword !==values.password){
      errors.rePassword = "Passwords don't match";
    }


      return errors;
  }

  let formik = useFormik({
    initialValues : {
      name:'',
      phone:'',
      email:'',
      password:'',
      rePassword:''
    }, validate,
     onSubmit: submitRegister
  });

  return <>
  <div className="container my-5 py-3">
    {error!== null?   <div className="alert alert-danger">{error}</div>: <></>}
  <h2 className='mt-3 fw-bold'>Register Now</h2>
  <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name" className="form-label">Name:</label>
      <input type="text" className="form-control mb-3" id="name"  name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}/>
      {formik.errors.name&& formik.touched.name? <div className="alert alert-danger ">{formik.errors.name}</div> : <></>}

      <label htmlFor="email" className="form-label">Email:</label>
      <input type="email" className="form-control mb-3" id="email"  name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
      {formik.errors.email&& formik.touched.email? <div className="alert alert-danger ">{formik.errors.email}</div> : <></>}

      <label htmlFor="phone" className="form-label">Phone:</label>
      <input type="tel" className="form-control mb-3" id="phone"  name='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone}/>
      {formik.errors.phone&& formik.touched.phone? <div className="alert alert-danger ">{formik.errors.phone}</div> : <></>}

      <label htmlFor="password" className="form-label">Password:</label>
      <input type="password" className="form-control mb-3" id="password"  name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
      {formik.errors.password&& formik.touched.password? <div className="alert alert-danger ">{formik.errors.password}</div> : <></>}

      <label htmlFor="rePassword" className="form-label">Re-password:</label>
      <input type="password" className="form-control mb-3" id="rePassword"  name='rePassword' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword}/>
      {formik.errors.rePassword&& formik.touched.rePassword? <div className="alert alert-danger ">{formik.errors.rePassword}</div> : <></>}

      <button disabled={!formik.isValid || !formik.dirty} type='submit' className='btn bg-main text-white '>Register</button>
    
  </form>
  </div>
  </>
}
