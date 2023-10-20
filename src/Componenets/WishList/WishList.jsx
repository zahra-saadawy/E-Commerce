import React, { useContext, useEffect, useState } from "react";
import { wishListContext } from "../../Context/WishListContext";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function WishList() {
  let { getLoggedUserCart, removeCartItem } = useContext(wishListContext);
  let {addToCart} = useContext(cartContext);

  const [WishListProducts, setWishListProducts] = useState(null);

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


  async function getwishList() {
    let { data } = await getLoggedUserCart();
    setWishListProducts(data);
    console.log(data);
  }

  async function removeWishItem(id) {
    let { data } = await removeCartItem(id);
    console.log(data);
    if (data.status === "success") {
      const updatedWishList = WishListProducts.data.filter(
        (product) => product._id !== id
      );

      setWishListProducts((prevProducts) => ({
        ...prevProducts,
        count: prevProducts.count - 1,
        data: updatedWishList,
      }));
    }
  }

  useEffect(() => {
    getwishList();
  }, []);
  return (
    <>
      {WishListProducts ? (
        <div className="bg-main-light py-4 px-4">
          <h3>Wish List</h3>
          <h4 className="h6 text-main fw-bolder">
            {" "}
            wishList Items:{WishListProducts.count}{" "}
          </h4>
          {WishListProducts.data.map((product) => (
            <div key={product._id} className="row gy-4 border-bottom py-2 px-2">
              <div className="col-md-1">
                <img
                  className="w-100"
                  src={product.imageCover}
                  alt={product.title}
                />
              </div>
              <div className="col-md-11">
                <div className=" align-items-center h-100">
                  <div>
                    <h3 className="h6">
                      {product.title?.split(" ").slice(0, 5).join(" ")}
                    </h3>
                    <h6 className="text-main">Price: {product.price} EGP</h6>

                    <button
                      onClick={() => removeWishItem(product._id)}
                      className="btn p-0  pt-4"
                    >
                      <i className="fas fa-trash-can text-danger"></i> Remove
                      item
                    </button>
                   
                  </div>
                  <button className="btn bg-main p-1 my-2" onClick={()=>addProduct(product._id)}>
                  <i class="fas fa-shopping-cart pe-1"></i>

                      add to cart
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-main-light py-4 px-4">
          <h3>Wish List</h3>
          <h4 className="h6 text-main fw-bolder"> WishList Items: 0</h4>
        </div>
      )}
    </>
  );
}