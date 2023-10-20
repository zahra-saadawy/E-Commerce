import React, { useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';



export default function VerifyCode() {
  const [isLoading, setIsLoading] = useState(false); 

  const [error, setError]= useState(null);
  let navigate = useNavigate()
  function validate(values){
    let errors ={};

     // Validate resetCode
     if(!values.resetCode){
       errors.resetCode= "resetCode is required";
     }
    
    return errors  
}
async function handleSubmit(values) {
  setIsLoading(true); 
  console.log('handling submittttttt');

  try {
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values);
    console.log(data.status)

    if (data.status === 'Success') {
      navigate('/updatepassword');
      console.log(data.status)
    }
  } catch (err) {
    setError(err.data.status);
  } finally {
    setIsLoading(false); 
  }
}




  let formik = useFormik({
    initialValues: { resetCode: ''},
    validate,
    onSubmit: handleSubmit
     })
  return <>
    <h3 className='mt-5'>please enter verification code sent to you</h3>
   <div className="container d-flex flex-column my-5">

   {error!== null?   <div className="alert alert-danger">{error}</div>: <></>}

      <form onSubmit={formik.handleSubmit}>
      <input type="resetCode" className="form-control mb-2 " id="resetCode"  name='resetCode' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.resetCode} placeholder='enter your resetCode'/>
      {formik.errors.resetCode&& formik.touched.resetCode? <div className="alert alert-danger ">{formik.errors.resetCode}</div> : <></>}

      
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
            Verify code          
            </button>
        )}
      
      </form>
   </div>
  </>
}
