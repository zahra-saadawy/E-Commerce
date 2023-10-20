import React, { useState } from 'react'
import Style from './ForgotPassword.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';



export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false); 

  const [error, setError]= useState(null);
  let navigate = useNavigate()
  function validate(values){
    let errors ={};

     // Validate Email
     const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
     if(!values.email){
       errors.email= "Email is required";
     }
     else if(!emailPattern.test(values.email)){
       errors.email = "Invalid email"
     }
return errors  
}
async function handleSubmit(values) {
  setIsLoading(true); 
  console.log('handling submittttttt');

  try {
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values);
    console.log(data.statusMsg)

    if (data.statusMsg === 'success') {
      navigate('/verifycode');
      console.log(data.statusMsg)
    }
  } catch (err) {
    setError(err.data.message);
  } finally {
    setIsLoading(false); 
  }
}




  let formik = useFormik({
    initialValues: { email: ''},
    validate,
    onSubmit: handleSubmit
     })
  return <>
    <h3 className='mt-5'>please enter your registered mail to reset your password</h3>
   <div className="container d-flex flex-column my-5">

   {error!== null?   <div className="alert alert-danger">{error}</div>: <></>}

      <form onSubmit={formik.handleSubmit}>
      <input type="email" className="form-control mb-2 " id="email"  name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} placeholder='enter your email'/>
      {formik.errors.email&& formik.touched.email? <div className="alert alert-danger ">{formik.errors.email}</div> : <></>}

      
      {isLoading ? (
        <button className="w-25 btn text-center bg-main font-sm py-2 px-2 border-0 text-white mt-3">   
        <BallTriangle
          height={30}
          width={100}
          radius={5}
          color="white"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      </button>
       
        ) : (
          <button type="submit" className="w-25 btn text-center bg-main font-sm py-2 px-2 border-0 text-white mt-3">
            Send Code
          </button>
        )}
      
      </form>
   </div>
  </>
}
