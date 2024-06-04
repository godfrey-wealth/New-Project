// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from '../api/axios';
// import Decode from '../utils/Decode';

// const USER_PROFILE_ENDPOINT = './api/users/profile';

// const Home = () => {
//   const [auth, setAuth] = useState(false);
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const authToken = localStorage.getItem('authToken');
//     const role = localStorage.getItem('role'); // Fetching user role from local storage

//     if (!authToken) {
//       setError('You are not authenticated. Please log in.');
//       navigate('/login');
//       return;
//     }

//     const decodedToken = Decode(authToken);
//     if (!decodedToken) {
//       setError('Invalid authentication token.');
//       navigate('/login');
//       return;
//     }

//     axios.get(USER_PROFILE_ENDPOINT, {
//       headers: {
//         Authorization: `Bearer ${authToken}`
//       }
//     })
//     .then(response => {
//       // Check if user is authorized based on role
//       if (role === 'CUSTOMER' || role === 'ADMIN' || role === 'SALES-MANAGER') {
//         setAuth(true);
//         setUser(response.data);
//       } else {
//         setError('You are not authorized to access this page.');
//         navigate('/login');
//       }
//     })
//     .catch(error => {
//       if (error.response && error.response.status === 401) {
//         setError('You are not authenticated. Please log in.');
//         navigate('/login');
//       } else {
//         setError('An error occurred while fetching user profile.');
//       }
//     });
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('role'); // Removing role from local storage
//     setAuth(false);
//     setUser(null);
//     navigate('/login');
//   };

//   return (
//     <div className='container mt-4'>
//       {error && <div>{error}</div>}
//       {auth && user && (
//         <div>
//           <h3>You are Authorized ---- {user.firstname}</h3>
//           <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
//         </div>
//       )}
//       {!auth && (
//         <div>
//           <h3>Login Now</h3>
//           <Link to="/login" className='btn btn-primary'>Login</Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;


import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import Decode from '../utils/Decode';

const USER_PROFILE_ENDPOINT = './api/users/profile';

const Home = () => {
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
          {/* <h3>You are Authorized ---- {user.RoleEnum}</h3> */}
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

export default Home;
