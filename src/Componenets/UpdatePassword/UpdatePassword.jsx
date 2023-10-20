import React, { useState } from 'react'
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
     // Validate Password
    const passwordPattern = /^[a-zA-Z][a-zA-Z0-9]{5,8}$/;
    if (!values.newPassword) {
      errors.newPassword = "Password is required";
    } else if (!passwordPattern.test(values.newPassword)) {
      errors.newPassword = `-Password must start with a letter 
      -Password must be between 6 and 9 characters long
      -Password must be containing only letters and numbers.`;
    }
return errors  
}
async function handleSubmit(values) {
  setIsLoading(true); 
  console.log('handling submittttttt');

  try {
    let res = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values);
    console.log(res)

      navigate('/login');
    
  } catch (err) {
    setError("Enter a valid password");
  } finally {
    setIsLoading(false); 
  }
}




  let formik = useFormik({
    initialValues: { email: '', newPassword: ''},
    validate,
    onSubmit: handleSubmit
     })
  return <>
    <h3 className='mt-5'>reset your password</h3>
   <div className="container d-flex flex-column my-5">

   {error!== null?   <div className="alert alert-danger">{error}</div>: <></>}

      <form onSubmit={formik.handleSubmit}>
      <input type="email" className="form-control mb-2 " id="email"  name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} placeholder='enter your email'/>
      {formik.errors.email&& formik.touched.email? <div className="alert alert-danger ">{formik.errors.email}</div> : <></>}


      <label htmlFor="newPassword" className="form-label">new password:</label>

      <input type="password" className="form-control mb-3" id="newPassword"  name='newPassword' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPassword} />
      {formik.errors.newPassword&& formik.touched.newPassword? <div className="alert alert-danger ">{formik.errors.newPassword}</div> : <></>}

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
            reset password
          </button>
        )}
      
      </form>
   </div>
  </>
}
