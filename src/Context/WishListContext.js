import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let wishListContext = createContext();


export default function WishListContextProvider(props) {


    const [listId, setCartId]= useState(null);
    let headers = { token: localStorage.getItem('userToken') };
    console.log(headers);


async function addToWish(productId) {
  try {
    const response = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
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

        return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {headers:headers})
      .then((response)=> response)
      .catch((err)=> err)
      
      }
  
      function removeCartItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers:headers})
      .then((response)=> response)
      .catch((err)=> err)
      }
  

    return(
        <wishListContext.Provider value={{removeCartItem, getLoggedUserCart, addToWish}}>
            {props.children}
        </wishListContext.Provider>
    )
}