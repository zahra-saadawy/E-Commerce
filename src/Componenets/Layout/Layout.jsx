import React, { useContext, useEffect } from 'react'
import Style from './Layout.module.css';
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import userEvent from '@testing-library/user-event';
import {Offline, Online} from 'react-detect-offline'
import toast, { useToaster } from 'react-hot-toast';


export default function Layout() {
let {setUserToken}= useContext(UserContext);
const { addToast } = useToaster();

useEffect(()=>{
  if (localStorage.getItem('userToken')!== null){
    setUserToken(localStorage.getItem('userToken'))
  }
},[]);
  return <>
  <Navbar/>
 <div className="container">
 <Outlet></Outlet>
 </div>
 <div>
 
 <Offline>
        <div
          style={{
            position: 'fixed',
            top: '90%',
            right: '75%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(255, 0, 0, 0.8)',
            padding: '10px',
            borderRadius: '5px',
            animation: 'slidedown',
            color: 'white',
          }}
        >
         <i class="fas fa-wifi"></i> 
 Oops! you're offline!
        </div>
      </Offline>

 </div>
  <Footer/>
  </>
}
