



import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
//import {Container}from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShoppingCart from "./layouts/ShoppingCart";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import CustomerPage from "./components/CUSTOMERS/CustomerPage";
import AdminPage from "./components/ADMIN/AdminPage.js";
import SalesManagerPage from "./components/SALES-MANAGER/SalesManagerPage.js";
import Navigation from "./components/Navigation";
import ProductArray  from "./components/CUSTOMERS/ProductStore/ProductArray";
import Store from "./components/CUSTOMERS/ProductStore/Store";




import ProductCards from "./components/CUSTOMERS/ProductStore/ProductCards";
import PlaceOrder from "./components/CUSTOMERS/ProductStore/PlaceOrder.js";
import { CartProvider } from "./components/CUSTOMERS/ProductStore/CartContext.js";
import Success from "./components/CUSTOMERS/ProductStore/Success.js";
import Service from "./layouts/Service.js";
import GetCustomerOrder from "./components/CUSTOMERS/GetCustomerOrder.js";

import "./App.css";
import Payments from "./components/CUSTOMERS/Payments.js";
import ProductList from "./components/ADMIN/ProductList.js";
import AddProduct from "./components/ADMIN/AddProduct.js";
import EditProduct from "./components/ADMIN/EditProduct.js";
import DeleteProduct from "./components/ADMIN/DeleteProduct.js";
import UserProfileList from "./components/ADMIN/UserProfileList.js";
import AdminProfile from "./components/ADMIN/AdminProfile.js";
import SalesProducts from "./components/SALES-MANAGER/SalesProducts.js";
import CustomersProfile from "./components/CUSTOMERS/CustomersProfile.js";
import SalesProfile from "./components/SALES-MANAGER/SalesProfile.js";
import About from "./layouts/About.js";



function App() {
  return (
    
    <CartProvider>
    <BrowserRouter>
   
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<ShoppingCart />} />
        
        <Route path="/services" element={<Service />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductArray/>} />
        {/* <Route path="/products" element={<ProductArray />} /> */}
        <Route path="/card" element={<ProductCards/>}/>
        <Route path="/suc" element={<Success/>}/>
        <Route path="/pay" element={<Payments/>} />
        <Route path="/list" element={<ProductList/>} />
        <Route path="/add" element={<AddProduct/>}/>
        <Route path="/edit/:productId" element={<EditProduct/>}/>
        <Route path="/delete/:id" element={<DeleteProduct/>}/>
        <Route path="/profileList" element={<UserProfileList/>}/>
        {/* <Route path="/orders/getOrder/:orderId" element={<GeetCustomerOrder />} /> */}
        <Route path="/orders" element={<GetCustomerOrder />} />

        <Route path="/customer" element={<CustomerPage />} /> 
        <Route  path="/custprof" element={<CustomersProfile/>}/>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/adprofile" element={<AdminProfile/>}/>
        <Route path="/sales-manager" element={<SalesManagerPage />} />
        <Route path="/salesprof" element={<SalesProfile/>} />
        <Route path="/prodlist" element={<SalesProducts/>}/>
      </Routes>
    </BrowserRouter>
     </CartProvider> 
  
  );
}

export default App;
