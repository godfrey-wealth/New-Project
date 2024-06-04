


// Updates Code

import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { CartContext } from '../CUSTOMERS/ProductStore/CartContext';
import Decode from '../../utils/Decode';
import styled from 'styled-components';

const USER_PROFILE_ENDPOINT = './api/users/profile';
const ADD_PRODUCT_ENDPOINT = './api/products/add';

const AddProduct = () => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [availableQuantity, setAvailableQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const cart = useContext(CartContext);
  const navigate = useNavigate();

  // Authentication and Authorization check
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
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    setAuth(false);
    setUser(null);
    navigate('/login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('authToken');

    const formData = new FormData();
    formData.append('images', productImage);
    formData.append('name', name);
    formData.append('availablequantity', availableQuantity);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('costPrice', costPrice);

    axios.post(ADD_PRODUCT_ENDPOINT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      // Handle success
      console.log(response);
      navigate('/list');
    })
    .catch((error) => {
      // Handle error
      console.error(error);
      setError('An error occurred while adding the product.');
    });
  };

  return (
    <Container className='container mt-4'>
      {error && <Error>{error}</Error>}
      {auth && user && (
        <div>
          <h3>Add Product</h3>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <label>Name</label>
              <input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
            </FormGroup>
            <FormGroup>
              <label>Available Quantity</label>
              <input type='number' value={availableQuantity} onChange={(e) => setAvailableQuantity(e.target.value)} required />
            </FormGroup>
            <FormGroup>
              <label>Price</label>
              <input type='number' value={price} onChange={(e) => setPrice(e.target.value)} required />
            </FormGroup>
            <FormGroup>
              <label>Category</label>
              <input type='text' value={category} onChange={(e) => setCategory(e.target.value)} required />
            </FormGroup>
            <FormGroup>
              <label>Cost Price</label>
              <input type='number' value={costPrice} onChange={(e) => setCostPrice(e.target.value)} required />
            </FormGroup>
            <FormGroup>
              <label>Product Image</label>
              <input type='file' onChange={(e) => setProductImage(e.target.files[0])} required />
            </FormGroup>
            <Button type='submit'>Add Product</Button>
          </form>
          <LogoutButton className='btn btn-danger' onClick={handleLogout}>
            Logout
          </LogoutButton>
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
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const Error = styled.div`
  color: red;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const LogoutButton = styled.button`
  margin-top: 10px;
`;

export default AddProduct;

