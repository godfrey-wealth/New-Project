// import React, { useState, useEffect, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from '../../api/axios';
// import { CartContext } from '../CUSTOMERS/ProductStore/CartContext';
// //import jwtDecode from 'jwt-decode'; // Adjusted import
// import Decode from '../../utils/Decode';

// const USER_PROFILE_ENDPOINT = './api/users/profile';

// const ProductList = () => {
//   const [auth, setAuth] = useState(false);
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);
//   const cart = useContext(CartContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const authToken = localStorage.getItem('authToken');
//     const role = localStorage.getItem('role');

//     if (!authToken || !role) {
//       setError('You are not authenticated. Please log in.');
//       return;
//     }

//     const decodedToken = Decode(authToken); // Adjusted usage
//     if (!decodedToken) {
//       setError('Invalid authentication token.');
//       return;
//     }

//     axios
//       .get(USER_PROFILE_ENDPOINT, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       })
//       .then((response) => {
//         setUser(response.data);
//         setAuth(true);
//       })
//       .catch((error) => {
//         if (error.response && error.response.status === 401) {
//           setError('You are not authenticated. Please log in.');
//         } else {
//           setError('An error occurred while fetching user profile.');
//         }
//       });
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
//           <div>
//         <h1>Welcome To Product List</h1>
//       </div>
//           <button className='btn btn-danger' onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       )}
//       {!auth && (
//         <div>
//           <h3>Login Now</h3>
//           <Link to='/login' className='btn btn-primary'>
//             Login
//           </Link>
//         </div>
//       )}

//       {/* Render success message */}
//       <div>
//         {/* <h1>Thank you for your Purchase</h1> */}
//       </div>
//     </div>
//   );
// };

// export default ProductList;


// NEW CODE


// import React, { useState, useEffect, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from '../../api/axios';
// import { CartContext } from '../CUSTOMERS/ProductStore/CartContext';
// import Decode from '../../utils/Decode';
// import styled from 'styled-components';

// const USER_PROFILE_ENDPOINT = './api/users/profile';
// const USER_PRODUCT_ENDPOINT = './api/products'
// const ProductList = () => {
//   const [auth, setAuth] = useState(false);
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);
//   const [products, setProducts] = useState([]);
//   const cart = useContext(CartContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const authToken = localStorage.getItem('authToken');
//     const role = localStorage.getItem('role');

//     if (!authToken || !role) {
//       setError('You are not authenticated. Please log in.');
//       return;
//     }

//     const decodedToken = Decode(authToken); // Adjusted usage
//     if (!decodedToken) {
//       setError('Invalid authentication token.');
//       return;
//     }

//     axios
//       .get(USER_PROFILE_ENDPOINT, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       })
//       .then((response) => {
//         setUser(response.data);
//         setAuth(true);
//       })
//       .catch((error) => {
//         if (error.response && error.response.status === 401) {
//           setError('You are not authenticated. Please log in.');
//         } else {
//           setError('An error occurred while fetching user profile.');
//         }
//       });

//     // Fetch products
//     // Fetch products
//   axios.get(USER_PRODUCT_ENDPOINT, {
//     headers: {
//       Authorization: `Bearer ${authToken}`,
//     },
//   })
//   .then(response => {
//     const productsWithImages = response.data.map(product => ({
//       ...product,
//       productImage: arrayBufferToBase64(product.productImage.data),
//     }));
//     setProducts(productsWithImages);
//   })
//   .catch(error => {
//     console.error('Error fetching products:', error);
//     setError('An error occurred while fetching products.');
//   });
// }, []);
// //     axios.get(USER_PRODUCT_ENDPOINT, {
// //       headers: {
// //         Authorization: `Bearer ${authToken}`,
// //       },
// //     })
// //       .then(response => {
// //         const productsWithImages = response.data.products.map(product => ({
// //           ...product,
// //           productImage: arrayBufferToBase64(product.productImage.data),
// //         }));
// //         setProducts(productsWithImages);
// //         setProducts(response.data);
// //       })
// //       .catch(error => {
// //         console.error('Error fetching products:', error);
// //         setError('An error occurred while fetching products.');
// //       });
// //   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('role');
//     setAuth(false);
//     setUser(null);
//     navigate('/login');
//   };

//   // Function to convert array buffer to base64
//   const arrayBufferToBase64 = (buffer) => {
//     let binary = '';
//     const bytes = new Uint8Array(buffer);
//     const len = bytes.byteLength;
//     for (let i = 0; i < len; i++) {
//       binary += String.fromCharCode(bytes[i]);
//     }
//     return btoa(binary);
//   };

//   return (
//     <Container className='container mt-4'>
//       {error && <Error>{error}</Error>}
//       {auth && user && (
//         <div>
//           <h3>You are Authorized ---- {user.firstname}</h3>
//           <ProductTable>
//             <thead>
//               <tr>
//                 <th>Product ID</th>
//                 <th>Name</th>
//                 <th>Available Quantity</th>
//                 <th>Price</th>
//                 <th>Category</th>
//                 <th>Cost Price</th>
//                 <th>Product Image</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map(product => (
//                 <tr key={product.productId}>
//                   <td>{product.productId}</td>
//                   <td>{product.name}</td>
//                   <td>{product.availableQuantity}</td>
//                   <td>{product.price}</td>
//                   <td>{product.category}</td>
//                   <td>{product.costPrice}</td>
//                   <td><img src={`data:image/jpeg;base64,${product.productImage}`} alt={product.name} style={{ width: '50px', height: '50px' }} /></td>
//                   <td>
//                     <ActionButtons>
//                       <ActionButton>Edit</ActionButton>
//                       <ActionButton>Delete</ActionButton>
//                     </ActionButtons>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </ProductTable>
//           <LogoutButton className='btn btn-danger' onClick={handleLogout}>
//             Logout
//           </LogoutButton>
//         </div>
//       )}
//       {!auth && (
//         <div>
//           <h3>Login Now</h3>
//           <Link to='/login' className='btn btn-primary'>
//             Login
//           </Link>
//         </div>
//       )}

//       {/* Render success message */}
//       <div>
//         {/* <h1>Thank you for your Purchase</h1> */}
//       </div>
//     </Container>
//   );
// };

// const Container = styled.div`
//   padding: 20px;
// `;

// const Error = styled.div`
//   color: red;
// `;

// const ProductTable = styled.table`
//   width: 100%;
//   border-collapse: collapse;

//   th, td {
//     border: 1px solid #ddd;
//     padding: 8px;
//     text-align: left;
//   }

//   th {
//     background-color: #f2f2f2;
//   }

//   tr:nth-child(even) {
//     background-color: #f2f2f2;
//   }
// `;

// const ActionButtons = styled.div`
//   display: flex;
// `;

// const ActionButton = styled.button`
//   margin-right: 5px;
//   cursor: pointer;
// `;

// const LogoutButton = styled.button`
//   margin-top: 10px;
// `;

// export default ProductList;




/// TRY THIS CODE

import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { CartContext } from '../CUSTOMERS/ProductStore/CartContext';
import Decode from '../../utils/Decode';
import styled from 'styled-components';

const USER_PROFILE_ENDPOINT = './api/users/profile';
const USER_PRODUCT_ENDPOINT = './api/products';

const ProductList = () => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const cart = useContext(CartContext);
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

    axios.get(USER_PRODUCT_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then(response => {
      setProducts(response.data.products);
    })
    .catch(error => {
      console.error('Error fetching products:', error);
      setError('An error occurred while fetching products.');
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
    <Container className='container mt-4'>
      {error && <Error>{error}</Error>}
      {auth && user && (
        <div>
          <h3>You are Authorized ---- {user.firstname}</h3>
          <ProductTable>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Available Quantity</th>
                <th>Price</th>
                <th>Category</th>
                <th>Cost Price</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.productId}>
                  <td>{product.productId}</td>
                  <td>{product.name}</td>
                  <td>{product.availablequantity}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.costPrice}</td>
                  <td><ProductImage src={`data:image/jpeg;base64,${product.prodImage}`} alt={product} /></td>
                  <td>
                    <ActionButtons>
                      <EditButton to={`/edit/${product.productId}`}>Edit</EditButton>
                      <DeleteButton to={`/delete/${product.productId}`}>Delete</DeleteButton>
                    </ActionButtons>
                  </td>
                </tr>
              ))}
            </tbody>
          </ProductTable>
          <LogoutButton className='btn btn-danger' onClick={handleLogout}>
            Logout
          </LogoutButton>
          <AddButton to="/add" className='btn btn-primary'>Add Product</AddButton>
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
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const Error = styled.div`
  color: red;
`;

const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const ActionButtons = styled.div`
  display: flex;
`;

const ActionButton = styled(Link)`
  margin-right: 5px;
  cursor: pointer;
  text-decoration: none;
`;

const EditButton = styled(ActionButton)`
  color: #007bff;
`;

const DeleteButton = styled(ActionButton)`
  color: #dc3545;
`;

const LogoutButton = styled.button`
  margin-top: 10px;
`;

const AddButton = styled(Link)`
  margin-top: 10px;
  text-decoration: none;
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;

export default ProductList;
