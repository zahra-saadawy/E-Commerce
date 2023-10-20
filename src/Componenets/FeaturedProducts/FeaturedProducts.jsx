import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query'
import {BallTriangle} from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import toast, {Toaster} from 'react-hot-toast';
import {wishListContext} from '../../Context/WishListContext'
export default function FeaturedProducts(productId) {
  const { addToCart } = useContext(cartContext);
  // const {addToWish}= useContext(wishListContext);

  const { addToWish, getLoggedUserCart} = useContext(wishListContext);
  const [wishListItems, setWishListItems] = useState(0);
  const [loading, setLoaLing] = useState(false);



  
  async function addProductWish(productId) {
    setLoaLing(true);
    let response = await addToWish(productId);
    if (response.data.status === "success") {
      setLoaLing(false);
      toast.success("Product added successfuly to your WishList");
    } else {
      setLoaLing(false);
      toast.error("Problem with adding product to your WishList");
    }
    setWishListItems(wishListItems + 1);
  }
  let { data: Wishlist } = useQuery(
    `wishlist-${wishListItems}`,
    getLoggedUserCart
  );
  function isInWishList(productId) {
    let arrays = Wishlist?.data.data;
    for (let i = 0; i < arrays?.length; i++) {
      if (arrays[i].id == productId) {
        return true;
      }
    }
    return false;
  }


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




  
   function getFeaturedProducts() {
    return axios.get ('https://ecommerce.routemisr.com/api/v1/products')
  }
  let {isLoading, isFetching, data} = useQuery('featuredProducts', getFeaturedProducts)
  // console.log (data?.data.data);

  return <>
       {isLoading? <div className='w-100 py-5 d-flex justify-content-center align-items-center'>
       <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
/>
       </div>:
       <div className="container py-2">
       <div className="row">
         {data?.data.data.map((product)=> <div key= {product.id} className='col-md-3'>

           <div className="product cursor-pointer py-3 px-2">
           <Link to ={`/productdetails/${product.id}`}>
             <img className='w-100' src={product.imageCover} alt={product.title} />
             </Link>
             <div className='d-flex justify-content-between mt-3'>
             <div>
             <span className='text-main font-sm fw-bolder'>{product.category.name}</span>
             <h3 className='h6'>{product.title.split (" ").slice(0,2).join (' ')}</h3>
             </div>

             {isInWishList(product.id) ? (
                        <button
                          onClick={() => addProductWish(product.id)}
                          className="border-0 bg-transparent ms-4 me-2"
                        >
                          <i class="fa-solid fa-heart fa-1xl text-danger"></i>
                        </button>
                      ) : (
                        <button
                          onClick={() => addProductWish(product.id)}
                          className="border-0 bg-transparent ms-4 me-2"
                        >
                          <i className="fa-regular fa-heart fa-1xl"></i>
                        </button>
                      )}

            </div>
             <div className='d-flex justify-content-between mt-3'>
               <span>{product.price} EGP</span>
               <p> <i className='fas fa-star rating-color'></i> {product.ratingsAverage}</p>
             
             </div>
             <button onClick={()=>{addProduct(product._id)
             console.log('here'+ product._id)
               }
} className='btn bg-main text-white w-100 btn-sm mt-2'> add to cart </button>
           </div>
           
         </div>
         
         )}
       </div>
   </div>}
      
         </>
}





