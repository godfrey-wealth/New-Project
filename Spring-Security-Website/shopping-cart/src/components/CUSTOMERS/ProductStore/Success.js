// import React from 'react'

// function Success() {
//   return (
//     <div><h1>Thank you for your Purchased</h1></div>
//   )
// }

// export default Success;

import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import { CartContext } from './CartContext';
//import jwtDecode from 'jwt-decode'; // Adjusted import
import Decode from '../../../utils/Decode';

const USER_PROFILE_ENDPOINT = './api/users/profile';

const Success = () => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const cart = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const role = localStorage.getItem('role');

    if (!authToken || !role) {
      setError('You are not authenticated. Please log in.');
      return;
    }

    const decodedToken = Decode(authToken); // Adjusted usage
    if (!decodedToken) {
      setError('Invalid authentication token.');
      return;
    }

    axios
      .get(USER_PROFILE_ENDPOINT, {
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

  return (
    <div className='container mt-4'>
      {error && <div>{error}</div>}
      {auth && user && (
        <div>
          <h3>You are Authorized ---- {user.firstname}</h3>
          <div>
        <h1>Thank you for your Purchase</h1>
      </div>
          <button className='btn btn-danger' onClick={handleLogout}>
            Logout
          </button>
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

      {/* Render success message */}
      <div>
        {/* <h1>Thank you for your Purchase</h1> */}
      </div>
    </div>
  );
};

export default Success;
