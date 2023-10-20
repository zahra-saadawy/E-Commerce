import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext();

export default function CartContextProvider(props) {
  const [cartId, setCartId]= useState(null);
    let headers = { token: localStorage.getItem('userToken') };
    console.log(headers);
  
    async function getCartId(){
      let {data} = await getLoggedUserCart();
      setCartId(data?.data._id)
      console.log(data?.data._id)
    }
    useEffect(()=>{
      getCartId();
    },[])
    async function onlinePayment(id, values){
      return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`, {
        shippingAddress: values
      },{headers:headers})
      .then((response)=> response)
      .catch((err)=> err)
    }
    async function addToCart(productId) {
      try {
        const response = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/cart`,
          {
            productId,
          },
          { headers }
        );
        return response; // Return the response on success
      } catch (error) {
        return error; // Return the error on failure
      }
    }
  
    function getLoggedUserCart(){

      return axios.get('https://ecommerce.routemisr.com/api/v1/cart', {headers:headers})
    .then((response)=> response)
    .catch((err)=> err)
    
    }

    function removeCartItem(productId){
      return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers:headers})
    .then((response)=> response)
    .catch((err)=> err)
    }

    function updateProductQuantity(productId, count){
      return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count}, {headers})
      .then((response)=> response)
      .catch((err)=> err)
    }
    function clearCart(){
      return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers:headers})
    .then((response)=> response)
    .catch((err)=> err)
    }


    return (
      <cartContext.Provider value={{cartId, addToCart , getLoggedUserCart,removeCartItem,updateProductQuantity, clearCart, onlinePayment}}>
        {props.children}
      </cartContext.Provider>
    );
  }
  