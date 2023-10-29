import logo from './logo.svg';
import './App.css';
import {RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Componenets/Layout/Layout';
import Home from './Componenets/Home/Home';
import Cart from './Componenets/Cart/Cart';
import Login from './Componenets/Login/Login';
import Register from './Componenets/Register/Register';
import Products from './Componenets/Products/Products';
import Notfound from './Componenets/Notfound/Notfound';
import Brands from './Componenets/Brands/Brands';
import Categories from './Componenets/Categories/Categories';
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './Componenets/ProtectedRoute/ProtectedRoute';
import PorductDetails from './Componenets/PorductDetails/PorductDetails';
import CartContextProvider from './Context/CartContext';
import {Toaster} from 'react-hot-toast'
import CheckOut from './Componenets/CheckOut/CheckOut';
import AllOrders from './Componenets/AllOrders/AllOrders';
import WishList from './Componenets/WishList/WishList';
import ForgotPassword from './Componenets/ForgotPassword/ForgotPassword';
import VerifyCode from './Componenets/verifyCode/VerifyCode';
import UpdatePassword from './Componenets/UpdatePassword/UpdatePassword';
import  WishListContext  from './Context/WishListContext';

let routers = createBrowserRouter([
  {
    path:'/', element:<Layout/>, children:[
      {element:<ProtectedRoute><Home/></ProtectedRoute>},
      {index: true, path: 'login', element:<Login/>},
      {path: 'register', element:<Register/>},
      {path: 'cart', element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path: 'products', element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path: 'checkout', element:<ProtectedRoute><CheckOut/></ProtectedRoute>},
      {path: 'allorders', element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
      {path: 'wishlist', element:<ProtectedRoute><WishList/></ProtectedRoute>},
      {path: 'forgotpassword', element:<ForgotPassword/>},
      {path: 'verifycode', element:<VerifyCode/>},
      {path: 'updatepassword', element:<UpdatePassword/>},

      {path: 'brands', element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path: 'categories', element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path: 'productdetails/:id', element:<ProtectedRoute><PorductDetails/></ProtectedRoute>},

      {path: '*', element:<Login/>}

    ]
  }
])
function App() {
  return <>
  <WishListContext>
  <CartContextProvider>
  <UserContextProvider>
      <RouterProvider router={routers}></RouterProvider>
      </UserContextProvider>
      <Toaster/>
  </CartContextProvider>
  </WishListContext>
      </>
}

export default App;
