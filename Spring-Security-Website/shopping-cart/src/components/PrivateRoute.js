// PrivateRoute.js
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthProvider'; // Import useAuth hook
// //import {useAu}

// const PrivateRoute = ({ role, element: Element, ...rest }) => {
//   const { authState } = useAuth(); // Use useAuth hook here

//   // Check if user is authenticated and has the required role
//   const isAuthenticated = authState.accessToken && authState.role === role;

//   return (
//     <Route
//       {...rest}
//       element={isAuthenticated ? <Element /> : <Navigate to="/login" />} // Navigate to login if not authenticated
//     />
//   );
// };

// export default PrivateRoute;


// // PrivateRoute.js
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthProvider';

// const PrivateRoute = ({ element: Element, ...rest }) => {
//   const { authState } = useAuth();
//   const isAuthenticated = authState.accessToken;

//   return isAuthenticated ? <Route {...rest} element={<Element />} /> : <Navigate to="/login" />;
// };

// export default PrivateRoute;


// // PrivateRoute.js
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthProvider';

// const PrivateRoute = ({ element: Element, ...rest }) => {
//   const { authState } = useAuth();
//   const isAuthenticated = authState.accessToken;

//   return isAuthenticated ? <Route {...rest} element={<Element />} /> : <Navigate to="/login" replace />;
// };

// export default PrivateRoute;


import React from 'react'
 import { Route, Navigate } from 'react-router-dom';
 import { useAuth } from '../context/AuthProvider';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { authState } = useAuth();
   const isAuthenticated = authState.accessToken;

 
  return (
     isAuthenticated ? <Route {...rest} element={<Element />} /> : <Navigate to="/login" replace />
  )
};

export default PrivateRoute
