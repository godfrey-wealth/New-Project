// import React from 'react';
// import { Navigate, Route, Routes } from 'react-router-dom';
// import useAuth from '../hooks/useAuth'; // Assuming you have a custom hook for authentication
// import AdminPage from './AdminPage';
// import CustomerPage from './CustomerPage';
// import SalesManagerPage from './SalesManagerPage';

// const AuthHome = () => {
//   const { auth } = useAuth(); // Assuming useAuth hook provides authentication information

//   return (
//     <Routes>
//       <Route
//         path="/admin"
//         element={auth && auth.roles.includes('ADMIN') ? <AdminPage /> : <Navigate to="/login" />}
//       />
//       <Route
//         path="/customer"
//         element={auth && auth.roles.includes('CUSTOMER') ? <CustomerPage /> : <Navigate to="/login" />}
//       />
//       <Route
//         path="/sales-manager"
//         element={auth && auth.roles.includes('SALES_MANAGER') ? <SalesManagerPage /> : <Navigate to="/login" />}
//       />
//     </Routes>
//   );
// };

// export default AuthHome;


import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; // Assuming you have a custom hook for authentication
import AdminPage from './AdminPage';
import CustomerPage from './CustomerPage';
import SalesManagerPage from './SalesManagerPage';
import axios from '../api/axios'; // Import axios for making API requests

const AUTH_ACCESS ='./api/users/profile';
const AuthHome = () => {
  const { auth, setAuth } = useAuth(); // Assuming useAuth hook provides authentication information
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth && auth.accessToken) {
      axios.get(AUTH_ACCESS)
        .then(response => {
          const { roles } = response.data;
          setAuth({ ...auth, roles });
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [auth, setAuth]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Routes>
      <Route
        path="/admin"
        element={auth && auth.roles.includes('ADMIN') ? <AdminPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/customer"
        element={auth && auth.roles.includes('CUSTOMER') ? <CustomerPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/sales-manager"
        element={auth && auth.roles.includes('SALES_MANAGER') ? <SalesManagerPage /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default AuthHome;



// import React, { useEffect, useState } from 'react';
// import { Navigate, Route, Routes } from 'react-router-dom';
// import useAuth from '../hooks/useAuth'; // Assuming you have a custom hook for authentication
// import AdminPage from './AdminPage';
// import CustomerPage from './CustomerPage';
// import SalesManagerPage from './SalesManagerPage';
// import axios from '../api/axios'; // Import axios for making API requests

// const AUTH_ACCESS ='./api/users/profile';
// const AuthHome = () => {
//   const { auth, setAuth } = useAuth(); // Assuming useAuth hook provides authentication information
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (auth && auth.accessToken) {
//       axios.get(AUTH_ACCESS, {
//         headers: {
//           'Authorization': `Bearer ${auth.accessToken}`,
//           'Content-Type': 'application/json', // Setting Content-Type header to application/json
//         },
//       })
//         .then(response => {
//           const { roles } = response.data;
//           setAuth({ ...auth, roles });
//         })
//         .catch(error => {
//           console.error('Error fetching user profile:', error);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     } else {
//       setLoading(false);
//     }
//   }, [auth, setAuth]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <Routes>
//       <Route
//         path="/admin"
//         element={auth && auth.roles.includes('ADMIN') ? <AdminPage /> : <Navigate to="/login" />}
//       />
//       <Route
//         path="/customer"
//         element={auth && auth.roles.includes('CUSTOMER') ? <CustomerPage /> : <Navigate to="/login" />}
//       />
//       <Route
//         path="/sales-manager"
//         element={auth && auth.roles.includes('SALES_MANAGER') ? <SalesManagerPage /> : <Navigate to="/login" />}
//       />
//     </Routes>
//   );
// };

// export default AuthHome;
  

// New Updaed code


// import React, { useEffect, useState } from 'react';
// import { Navigate, Route, Routes } from 'react-router-dom';
// import axios from '../api/axios'; // Import axios for making API requests
// import AdminPage from './AdminPage';
// import CustomerPage from './CustomerPage';
// import SalesManagerPage from './SalesManagerPage';

// const AUTH_ACCESS = './api/users/profile';

// const AuthHome = ({ userRole, setUserRole }) => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get(AUTH_ACCESS, {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
//             'Content-Type': 'application/json', // Setting Content-Type header to application/json
//           },
//         });
//         const { roles } = response.data;
//         setUserRole(roles);
//       } catch (error) {
//         console.error('Error fetching user profile:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, [userRole, setUserRole]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <Routes>
//       <Route
//         path="/admin"
//         element={userRole && userRole.includes('ADMIN') ? <AdminPage /> : <Navigate to="/login" />}
//       />
//       <Route
//         path="/customer"
//         element={userRole && userRole.includes('CUSTOMER') ? <CustomerPage /> : <Navigate to="/login" />}
//       />
//       <Route
//         path="/sales-manager"
//         element={userRole && userRole.includes('SALES_MANAGER') ? <SalesManagerPage /> : <Navigate to="/login" />}
//       />
//     </Routes>
//   );
// };

// export default AuthHome;



