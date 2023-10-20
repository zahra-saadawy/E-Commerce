import React, {  useContext, useEffect, useState } from 'react';
import Style from './Cart.module.css';
import { cartContext } from '../../Context/CartContext';
import { BallTriangle } from 'react-loader-spinner';
import CheckOut from './../CheckOut/CheckOut';
import { useNavigate } from 'react-router-dom';


export default function Cart() {
  let navigate = useNavigate();
  let { clearCart, getLoggedUserCart, removeCartItem, updateProductQuantity } = useContext(cartContext);
  const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getCart() {
    let { data } = await getLoggedUserCart();
    setCartDetails(data);
    setLoading(false);
  }

  async function refreshCart() {
    try {
      const { data } = await getLoggedUserCart();
      setCartDetails(data);
    } catch (error) {
      console.error("Error refreshing the cart:", error);
    }
  }
  

  async function deleteCart() {
    try {
      const { data } = await clearCart();
      refreshCart();
    } catch (error) {
      console.error("Error clearing the cart:", error);
    }
  }
  

  async function removeItem(id) {
    let { data } = await removeCartItem(id);
    setCartDetails(data);
  }

  async function updateCount(id, count) {
    let { data } = await updateProductQuantity(id, count);
    setCartDetails(data);
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      {loading ? (
        <section id="loading" className="d-flex justify-content-center align-items-center">
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
        </section>
      ) : cartDetails ? (
        <div className="w-75 mx-auto p-3 bg-main-light">
          <h3>Shopping Cart</h3>
          <h4 className="h6 text-main fw-bolder"> Cart Items: {cartDetails.numOfCartItems}</h4>
          <h4 className="h6 text-main fw-bolder mb-4"> Total Items Price: {cartDetails.data.totalCartPrice} EGP</h4>
          {cartDetails.data.products.map((product) => (
            <div className="row border-bottom py-3" key={product.product.id}>
              <div className="col-md-1">
                <img className="w-100" src={product.product.imageCover} alt="" />
              </div>
              <div className="col-md-11">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 className="h6"> {product.product.title}</h3>
                    <h6 className="text-main">Price: {product.price} EGP</h6>
                  </div>
                  <div>
                    <button onClick={() => updateCount(product.product.id, product.count + 1)} className="btn text-main fw-bolder fs-2">+</button>
                    <span className="mx-2">{product.count}</span>
                    <button onClick={() => updateCount(product.product.id, product.count - 1)} className="btn text-main fw-bolder fs-2">-</button>
                  </div>
                </div>
                <button onClick={() => removeItem(product.product.id)} className="btn p-0 font-sm text-danger">
                  <i className="fas fa-trash-can"></i> Remove
                </button>
              </div>
            </div>
          ))}


         

          <button onClick={() => navigate('/checkout')} className="btn text-center bg-main font-sm  py-2 px-4 border-0 text-white mt-3">
            check out
          </button>
          <span
          style={{
            display: cartDetails ? "block" : "none",
            color: "red",
            textDecoration: "underline",
          }}
          onClick={() => deleteCart()}
          className="font-sm text-danger mt-3"
>
  CLEAR YOUR CART
          </span>

        </div>
      ) : (
        <div className="text-center text-danger">Your cart is empty.</div>
      )}
    </>
  );
}
