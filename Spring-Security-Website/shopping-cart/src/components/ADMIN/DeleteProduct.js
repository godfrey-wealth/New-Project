import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { CartContext } from '../CUSTOMERS/ProductStore/CartContext';
import Decode from '../../utils/Decode';

const USER_PROFILE_ENDPOINT = './api/users/profile';
const GET_PRODUCT_ENDPOINT = './api/products/';
const DELETE_PRODUCT_ENDPOINT = './api/products/';

const DeleteProduct = () => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const cart = useContext(CartContext);
  const { productId } = useParams();
  const { id } = useParams();
  const navigate = useNavigate();

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
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      setUser(response.data);
      setAuth(true);
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        setError('You are not authenticated. Please log in.');
      } else {
        setError('An error occurred while fetching user profile.');
      }
    });

    axios.get(`${GET_PRODUCT_ENDPOINT}${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      setProduct(response.data);
    })
    .catch((error) => {
      console.error('Error fetching product data:', error);
      setError('An error occurred while fetching product data.');
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    setAuth(false);
    setUser(null);
    navigate('/login');
  };

  const handleDelete = () => {
    const authToken = localStorage.getItem('authToken');

    axios.delete(`${DELETE_PRODUCT_ENDPOINT}${productId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      console.log(response);
      navigate('/list');
    })
    .catch((error) => {
      console.error(error);
      setError('An error occurred while deleting the product.');
    });
  };

  return (
    <div>
      {error && <div>{error}</div>}
      {auth && user && product && (
        <div>
          <h3>Delete Product</h3>
          <p>Are you sure you want to delete "{product.productId}"?</p>
          <p>Are you sure you want to delete "{product.name}"?</p>
          <button onClick={handleDelete}>Delete</button>
          <div>
          <button className='btn btn-danger' onClick={handleLogout}>
            Logout
          </button>
          </div>
        </div>
      )}
      {!auth && (
        <div>
          <h3>Login Now</h3>
          <Link to='/login' className='btn btn-primary'>
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default DeleteProduct;
