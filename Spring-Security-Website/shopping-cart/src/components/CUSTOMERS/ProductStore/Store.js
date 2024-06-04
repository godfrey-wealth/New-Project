
// import React from 'react'

// import {Row} from "react-bootstrap";
// import { ProductArray } from './ProductArray';
// import CardProduct from './CardProduct';

// function Store() {
//   return (
//     <div>
        
//         <h1>Welcom to Shopping Cart</h1>
//         <Row xs={1} md={3} className='g-4'>
//             {ProductArray.map((product, idx)=>(
//                 <Col align = "center" idx>
//                     <CardProduct product={product} />
//                 </Col>
//             ))}
//         </Row>
       
//     </div>
//   )
// }

// export default Store

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import Decode from '../../../utils/Decode';
import { Row, Col } from 'react-bootstrap';
import ProductCards from './ProductCards'; // Assuming ProductCards is the correct component name

const USER_PROFILE_ENDPOINT = './api/users/profile';
const PRODUCTS_ENDPOINT = './api/products';

const Store = () => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = () => {
    axios.get(PRODUCTS_ENDPOINT)
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const role = localStorage.getItem('role');

    if (!authToken || !role) {
      setError('You are not authenticated. Please log in.');
      return;
    }

    const decodedToken = Decode(authToken);
    if (!decodedToken) {
      setError('Invalid authentication token.');
      return;
    }

    axios.get(USER_PROFILE_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    .then(response => {
      setUser(response.data);
      setAuth(true);
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        setError('You are not authenticated. Please log in.');
      } else {
        setError('An error occurred while fetching user profile.');
      }
    });

    fetchProducts();

  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    setAuth(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <div className='container mt-4'>
      {error && <div>{error}</div>}
      {auth && user && (
        <div>
          <h3>You are Authorized ---- {user.firstname}</h3>
          <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
        </div>
      )}
      {!auth && (
        <div>
          <h3>Login Now</h3>
          <Link to="/login" className='btn btn-primary'>Login</Link>
        </div>
      )}
      <h1>Welcome to Shopping Cart</h1>
      <Row xs={1} md={3} className='g-4'>
        {products.length > 0 ? (
          products.map((product, idx) => (
            <Col key={idx} align='center'>
              <ProductCards product={product} />
            </Col>
          ))
        ) : (
          <p>No products available</p>
        )}
      </Row>
    </div>
  );
};

export default Store;
