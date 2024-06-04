import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import Decode from '../../utils/Decode';

const USER_PROFILE_ENDPOINT = './api/users/profile';

const AdminPage = () => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
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
    </div>
  );
};

export default AdminPage;
