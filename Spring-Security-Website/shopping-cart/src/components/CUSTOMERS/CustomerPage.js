// import React from 'react'

// const CustomerPage = () => {
//   return (
//     <div>
//         <h1 >Welcome Your Authorize Customer</h1>
//     </div>
//   )
// }

// export default CustomerPage



// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from '../api/axios';
// import Decode from '../utils/Decode';

// const USER_PROFILE_ENDPOINT = './api/users/profile';

// const CustomerPage = () => {
//   const [auth, setAuth] = useState(false);
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const authToken = localStorage.getItem('authToken');
//     const role = localStorage.getItem('role');

//     if (!authToken || !role) {
//       setError('You are not authenticated. Please log in.');
//       return;
//     }

//     const decodedToken = Decode(authToken);
//     if (!decodedToken) {
//       setError('Invalid authentication token.');
//       return;
//     }

//     axios.get(USER_PROFILE_ENDPOINT, {
//       headers: {
//         Authorization: `Bearer ${authToken}`
//       }
//     })
//     .then(response => {
//       setUser(response.data);
//       setAuth(true);
//     })
//     .catch(error => {
//       if (error.response && error.response.status === 401) {
//         setError('You are not authenticated. Please log in.');
//       } else {
//         setError('An error occurred while fetching user profile.');
//       }
//     });
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('role');
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
//           <h3>You are Authorized ---- {user.lastname}</h3>
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

// export default CustomerPage;

// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from '../api/axios';
// import Decode from '../utils/Decode';
// import './Customer.css';

// const USER_PROFILE_ENDPOINT = './api/users/profile';

// const CustomerPage = () => {
//   const [auth, setAuth] = useState(false);
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const authToken = localStorage.getItem('authToken');
//     const role = localStorage.getItem('role');

//     if (!authToken || !role) {
//       setError('You are not authenticated. Please log in.');
//       return;
//     }

//     const decodedToken = Decode(authToken);
//     if (!decodedToken) {
//       setError('Invalid authentication token.');
//       return;
//     }

//     axios.get(USER_PROFILE_ENDPOINT, {
//       headers: {
//         Authorization: `Bearer ${authToken}`
//       }
//     })
//     .then(response => {
//       setUser(response.data);
//       setAuth(true);
//     })
//     .catch(error => {
//       if (error.response && error.response.status === 401) {
//         setError('You are not authenticated. Please log in.');
//       } else {
//         setError('An error occurred while fetching user profile.');
//       }
//     });
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('role');
//     setAuth(false);
//     setUser(null);
//     navigate('/login');
//   };

//   return (
//     <div className='container mt-4'>
//       {error && <div>{error}</div>}
//       {auth && user && (
//         <div>
//           <h3>Welcome, {user.firstname} {user.lastname}</h3>
//           <div className="customer-options">
//             <Link to="/profile" className='btn btn-primary mr-2'>Profile</Link>
//             <Link to="/products" className='btn btn-primary mr-2'>Products</Link>
//             <Link to="/place-order" className='btn btn-primary mr-2'>Place Order</Link>
//           </div>
//           <button className='btn btn-danger mt-2' onClick={handleLogout}>Logout</button>
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

// export default CustomerPage;



// nEW version UI

// import React, { useEffect, useState } from 'react';
// import { NavLink, useNavigate, Link } from 'react-router-dom';
// import axios from '../api/axios';
// import Decode from '../utils/Decode';
// import styled from 'styled-components';

// const Container = styled.div`
//   max-width: 800px;
//   margin: 0 auto;
//   padding: 20px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const WelcomeMessage = styled.h3`
//   color: #6a1b9a;
// `;

// const NavList = styled.ul`
//   list-style-type: none;
//   margin: 0;
//   padding: 0;
//   display: flex;
// `;

// const NavItem = styled.li`
//   margin: 0 10px;
// `;

// const Button = styled.button`
//   padding: 10px 20px;
//   border: none;
//   border-radius: 5px;
//   background-color: #6a1b9a;
//   color: #fff;
//   text-decoration: none;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #4a148c;
//   }
// `;

// const NavLinkStyled = styled(NavLink)`
//   color: #fff;
//   text-decoration: none;
// `;

// const USER_PROFILE_ENDPOINT = './api/users/profile';

// const CustomerPage = () => {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const auth = localStorage.getItem('authToken');

//   useEffect(() => {
//     const authToken = localStorage.getItem('authToken');
//     const role = localStorage.getItem('role');

//     if (!authToken || !role) {
//       setError('You are not authenticated. Please log in.');
//       return;
//     }

//     const decodedToken = Decode(authToken);
//     if (!decodedToken) {
//       setError('Invalid authentication token.');
//       return;
//     }

//     axios.get(USER_PROFILE_ENDPOINT, {
//       headers: {
//         Authorization: `Bearer ${authToken}`
//       }
//     })
//     .then(response => {
//       setUser(response.data);
//     })
//     .catch(error => {
//       if (error.response && error.response.status === 401) {
//         setError('You are not authenticated. Please log in.');
//       } else {
//         setError('An error occurred while fetching user profile.');
//       }
//     });
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('role');
//     setUser(null);
//     navigate('/login');
//   };

//   return (
//     <Container>
//       {error && <div>{error}</div>}
//       {auth && (
//         <>
//          <h3>You are Authorized</h3>
//           <WelcomeMessage>Welcome, {user && user.firstname} {user && user.lastname}</WelcomeMessage>
//           <NavList>
//             <NavItem>
//               <NavLinkStyled to="/profile">Profile</NavLinkStyled>
//             </NavItem>
//             <NavItem>
//               <NavLinkStyled to="/products">Products</NavLinkStyled>
//             </NavItem>
//             <NavItem>
//               <NavLinkStyled to="/place-order">Orders</NavLinkStyled>
//             </NavItem>
//             {user && (
//               <NavItem>
//                 <Button onClick={handleLogout}>Logout</Button>
//               </NavItem>
//             )}
//           </NavList>
//         </>
//       )}
//       {!auth && (
//         <div>
//           <h3>Login Now</h3>
//           <Link to="/login" className='btn btn-primary'>Login</Link>
//         </div>
//       )}
//     </Container>
//   );
// };

// export default CustomerPage;


// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from '../api/axios';
// import Decode from '../utils/Decode';
// import styled from 'styled-components';

// const Container = styled.div`
//   max-width: 800px;
//   margin: 0 auto;
//   padding: 20px;
// `;

// const WelcomeMessage = styled.h3`
//   color: #6a1b9a;
// `;

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
//   cursor: pointer;

//   &:hover {
//     background-color: #673ab7;
//   }
// `;

// const USER_PROFILE_ENDPOINT = './api/users/profile';

// const CustomerPage = () => {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const auth = localStorage.getItem('authToken');

//   useEffect(() => {
//     const authToken = localStorage.getItem('authToken');
//     const role = localStorage.getItem('role');

//     if (!authToken || !role) {
//       setError('You are not authenticated. Please log in.');
//       return;
//     }

//     const decodedToken = Decode(authToken);
//     if (!decodedToken) {
//       setError('Invalid authentication token.');
//       return;
//     }

//     axios.get(USER_PROFILE_ENDPOINT, {
//       headers: {
//         Authorization: `Bearer ${authToken}`
//       }
//     })
//     .then(response => {
//       setUser(response.data);
//     })
//     .catch(error => {
//       if (error.response && error.response.status === 401) {
//         setError('You are not authenticated. Please log in.');
//       } else {
//         setError('An error occurred while fetching user profile.');
//       }
//     });
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('role');
//     setUser(null);
//     navigate('/login');
//   };

//   return (
//     <Container>
//       {error && <div>{error}</div>}
//       {auth && (
//         <>
//           <WelcomeMessage>Welcome, {user && user.firstname} {user && user.lastname}</WelcomeMessage>
//           <Nav>
//             <NavList>
//               <NavItem>
//                 <NavLink to="/profile">Profile</NavLink>
//               </NavItem>
//               <NavItem>
//                 <NavLink to="/products">Products</NavLink>
//               </NavItem>
//               <NavItem>
//                 <NavLink to="/place-order">Place Order</NavLink>
//               </NavItem>
//               {user && (
//                 <NavItem>
//                   <button onClick={handleLogout} style={{ backgroundColor: '#6a1b9a', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 12px', cursor: 'pointer' }}>Logout</button>
//                 </NavItem>
//               )}
//             </NavList>
//           </Nav>
//         </>
//       )}
//       {!auth && (
//         <div>
//           <h3>Login Now</h3>
//           <Link to="/login" className='btn btn-primary'>Login</Link>
//         </div>
//       )}
//     </Container>
//   );
// };

// export default CustomerPage;



// New Code From AdminPage

import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import Decode from '../../utils/Decode';
import { CartContext } from './ProductStore/CartContext';

const USER_PROFILE_ENDPOINT = './api/users/profile';

const CustomerPage = () => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const cart = useContext(CartContext)
  const [show, setShow] = useState(false);
  const handleClose = ()=>setShow(false);
  const handleShow = ()=>setShow(false);
  const navigate = useNavigate();

  const productCounts =  cart.items.reduce((sum, product)=>sum + product.quantity, 0);
  

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

export default CustomerPage;
