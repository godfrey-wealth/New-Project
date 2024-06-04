// // // // src/components/Navigation.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';

// const Nav = styled.nav`
//   background-color: #6a1b9a;
//   padding: 20px;
// `;

// const NavList = styled.ul`
//   list-style-type: none;
//   margin: 0;
//   padding: 0;
//   display: flex;
//   justify-content: center;
// `;

// const NavItem = styled.li`
//   margin: 0 10px;
// `;

// const NavLink = styled(Link)`
//   color: #fff;
//   text-decoration: none;
//   padding: 8px 12px;
//   border-radius: 5px;

//   &:hover {
//     background-color: #673ab7;
//   }
// `;

// const Navigation = () => {
//   return (
//     <Nav>
//       <NavList>
//         <NavItem><NavLink to="#">Home</NavLink></NavItem>
//         {/* <NavItem><NavLink to="/register">Register</NavLink></NavItem>
//         <NavItem><NavLink to="/login">Login</NavLink></NavItem>
//         {/* <NavItem><NavLink to="/about">About</NavLink></NavItem>  */}
//         {/* <NavItem><NavLink to="/service">Service</NavLink></NavItem> */}
//         <NavItem><NavLink to="/shopping-cart">Shopping Cart</NavLink></NavItem>
//       </NavList>
//     </Nav>
//   );
// };

// export default Navigation;


// Later I will use this code

// import React from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';

// const Nav = styled.nav`
//   background-color: #6a1b9a;
//   padding: 20px;
// `;

// const NavList = styled.ul`
//   list-style-type: none;
//   margin: 0;
//   padding: 0;
//   display: flex;
//   justify-content: center;
// `;

// const NavItem = styled.li`
//   margin: 0 10px;
// `;

// const NavLink = styled(Link)`
//   color: #fff;
//   text-decoration: none;
//   padding: 8px 12px;
//   border-radius: 1px;

//   &:hover {
//     background-color: #673ab7;
//   }
// `;

// const Navigation = ({ isLoggedIn, handleLogout }) => {
//   return (
//     <Nav>
//       <NavList>
//         <NavItem><NavLink to="/">Home</NavLink></NavItem>
//         <NavItem><NavLink to="/cart">Shopping Cart</NavLink></NavItem>
//         {isLoggedIn ? (
//           <NavItem>
//             <button onClick={handleLogout}>Logout</button>
//           </NavItem>
//         ) : (
//           <>
//             <NavItem><NavLink to="/login">Login</NavLink></NavItem>
//             {/* Add Register link if needed */}
//             {/* <NavItem><NavLink to="/register">Register</NavLink></NavItem> */}
//           </>
//         )}
//       </NavList>
//     </Nav>
//   );
// };

// export default Navigation;




// Roles and Authentication added on the NavBar

// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from '../api/axios';
// import Decode from '../utils/Decode';
// import styled from 'styled-components';


// const Nav = styled.nav`
//   background-color: #6a1b9a;
//   padding: 20px;
// `;

// const NavList = styled.ul`
//   list-style-type: none;
//   margin: 0;
//   padding: 0;
//   display: flex;
//   justify-content: center;
// `;

// const NavItem = styled.li`
//   margin: 0 10px;
// `;

// const NavLink = styled(Link)`
//   color: #fff;
//   text-decoration: none;
//   padding: 8px 12px;
//   border-radius: 1px;

//   &:hover {
//     background-color: #673ab7;
//   }
// `;

// const USER_PROFILE_ENDPOINT = './api/users/profile';

// const Navigation = () => {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const authToken = localStorage.getItem('authToken');
//   const role = localStorage.getItem('role');
//   const isLoggedIn = authToken && role;

//   useEffect(() => {
//     if (isLoggedIn) {
//       const decodedToken = Decode(authToken);
//       if (!decodedToken) {
//         setError('Invalid authentication token.');
//         return;
//       }

//       axios.get(USER_PROFILE_ENDPOINT, {
//         headers: {
//           Authorization: `Bearer ${authToken}`
//         }
//       })
//       .then(response => {
//         setUser(response.data);
//       })
//       .catch(error => {
//         if (error.response && error.response.status === 401) {
//           setError('You are not authenticated. Please log in.');
//         } else {
//           setError('An error occurred while fetching user profile.');
//         }
//       });
//     }
//   }, [isLoggedIn, authToken]);

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('role');
//     setUser(null);
//     navigate('/login');
//   };

//   return (
//     <Nav>
//       <NavList>
//         <NavItem><NavLink to="/">Home</NavLink></NavItem>
//         {isLoggedIn && role === 'CUSTOMER' && (
//           <>
//             <NavItem><NavLink to="/profile">Profile</NavLink></NavItem>
//             <NavItem><NavLink to="/card">Shops</NavLink></NavItem>
//             <NavItem><NavLink to="/orders">Customer-Order</NavLink></NavItem>
//             <NavItem><NavLink to="/oder">Place Order</NavLink></NavItem>
//             <NavItem><NavLink to="/pay">Payment</NavLink></NavItem>
            
//           </>
//         )}
//         {isLoggedIn && role === 'ADMIN' && (
//           <>
//             <NavItem><NavLink to="/products">Product</NavLink></NavItem>
//             <NavItem><NavLink to="/user-profiles">User Profiles</NavLink></NavItem>
//           </>
//         )}
//         {isLoggedIn && role === 'SALES_MANAGER' && (
//           <>
//             <NavItem><NavLink to="/all-orders">All Orders</NavLink></NavItem>
//             <NavItem><NavLink to="/sales">Sales</NavLink></NavItem>
//             <NavItem><NavLink to="/revenues">Revenues</NavLink></NavItem>
//           </>
//         )}
//         {!isLoggedIn && (
//           <>
//             <NavItem><NavLink to="/cart">Shopping Cart</NavLink></NavItem>
//             <NavItem><NavLink to="/about">About</NavLink></NavItem>
//             <NavItem><NavLink to="/services">Services</NavLink></NavItem>
//           </>
//         )}
//         {isLoggedIn && (
//           <NavItem>
//             <button onClick={handleLogout} style={{ backgroundColor: '#6a1b9a', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 12px', cursor: 'pointer' }}>Logout</button>
//           </NavItem>
//         )}
//       </NavList>
//       {error && <div>{error}</div>}
//     </Nav>
//   );
// };

// export default Navigation;



// Testing NEW CODE

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import Decode from '../utils/Decode';
import styled from 'styled-components';


const Nav = styled.nav`
  background-color: #6a1b9a;
  padding: 20px;
`;

const NavList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
`;

const NavItem = styled.li`
  margin: 0 10px;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 1px;
  font-weight: bold; /* Make the font bold */

  &:hover {
    background-color: #673ab7;
  }
`;

const USER_PROFILE_ENDPOINT = './api/users/profile';

const Navigation = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const authToken = localStorage.getItem('authToken');
  const role = localStorage.getItem('role');
  const isLoggedIn = authToken && role;

  useEffect(() => {
    if (isLoggedIn) {
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
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          setError('You are not authenticated. Please log in.');
        } else {
          setError('An error occurred while fetching user profile.');
        }
      });
    }
  }, [isLoggedIn, authToken]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    setUser(null);
    navigate('/login');
  };

  return (
    <Nav>
      <NavList>
        <NavItem><NavLink to="/">Home</NavLink></NavItem>
        {isLoggedIn && role === 'CUSTOMER' && (
          <>
            <NavItem><NavLink to="/custprof">Customer-Profile</NavLink></NavItem>
            <NavItem><NavLink to="/card">Shops</NavLink></NavItem>
            <NavItem><NavLink to="/orders">Customer-Order</NavLink></NavItem>
           
            <NavItem><NavLink to="/pay">Payment</NavLink></NavItem>
          </>
        )}
        {isLoggedIn && role === 'ADMIN' && (
          <>
           
            <NavItem><NavLink to="/adprofile">Admin Profile</NavLink></NavItem>
            <NavItem><NavLink to="/profileList">Profiles</NavLink></NavItem>
            <NavItem><NavLink to="/list">Product-List</NavLink></NavItem>
          </>
        )}
        {isLoggedIn && role === 'SALES_MANAGER' && (
          <>
           <NavItem><NavLink to="/products">All Orders</NavLink></NavItem>
           <NavItem><NavLink to="/prodlist">Products</NavLink></NavItem>
            <NavItem><NavLink to="/salesprof">Sales-Profile</NavLink></NavItem>
            <NavItem><NavLink to="/revenues">Revenues</NavLink></NavItem>
          </>
        )}
        {!isLoggedIn && (
          <>
            <NavItem><NavLink to="/cart">Shopping Cart</NavLink></NavItem>
            <NavItem><NavLink to="/about">About</NavLink></NavItem>
            <NavItem><NavLink to="/services">Services</NavLink></NavItem>
          </>
        )}
        {isLoggedIn && (
          <NavItem>
            <button onClick={handleLogout} style={{ backgroundColor: '#6a1b9a', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 12px', cursor: 'pointer' }}>Logout</button> 
          </NavItem>
        )}
      </NavList>
      {error && <div>{error}</div>}
    </Nav>
  );
};

export default Navigation;
