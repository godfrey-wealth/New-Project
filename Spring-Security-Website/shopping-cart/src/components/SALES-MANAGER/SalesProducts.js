
// import React, { useState, useEffect, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from '../../api/axios';
// import { CartContext } from '../CUSTOMERS/ProductStore/CartContext';
// import Decode from '../../utils/Decode';
// import styled from 'styled-components';

// const USER_PROFILE_ENDPOINT = './api/users/profile';
// const USER_PRODUCT_ENDPOINT = './api/products';

// const SalesProducts = () => {
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

//     const decodedToken = Decode(authToken);
//     if (!decodedToken) {
//       setError('Invalid authentication token.');
//       return;
//     }

//     axios.get(USER_PROFILE_ENDPOINT, {
//       headers: {
//         Authorization: `Bearer ${authToken}`,
//       },
//     })
//     .then((response) => {
//       setUser(response.data);
//       setAuth(true);
//     })
//     .catch((error) => {
//       if (error.response && error.response.status === 401) {
//         setError('You are not authenticated. Please log in.');
//       } else {
//         setError('An error occurred while fetching user profile.');
//       }
//     });

//     axios.get(USER_PRODUCT_ENDPOINT, {
//       headers: {
//         Authorization: `Bearer ${authToken}`,
//       },
//     })
//     .then(response => {
//       setProducts(response.data.products);
//     })
//     .catch(error => {
//       console.error('Error fetching products:', error);
//       setError('An error occurred while fetching products.');
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
//                 <th>Image</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map(product => (
//                 <tr key={product.productId}>
//                   <td>{product.productId}</td>
//                   <td>{product.name}</td>
//                   <td>{product.availablequantity}</td>
//                   <td>{product.price}</td>
//                   <td>{product.category}</td>
//                   <td>{product.costPrice}</td>
//                   <td><ProductImage src={`data:image/jpeg;base64,${product.prodImage}`} alt={product} /></td>
//                   {/* <td>
//                     <ActionButtons>
//                       <EditButton to={`/edit/${product.productId}`}>Edit</EditButton>
//                       <DeleteButton to={`/delete/${product.productId}`}>Delete</DeleteButton>
//                     </ActionButtons>
//                   </td> */}
//                 </tr>
//               ))}
//             </tbody>
//           </ProductTable>
//           <LogoutButton className='btn btn-danger' onClick={handleLogout}>
//             Logout
//           </LogoutButton>
//           {/* <AddButton to="/add" className='btn btn-primary'>Add Product</AddButton> */}
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

// const ActionButton = styled(Link)`
//   margin-right: 5px;
//   cursor: pointer;
//   text-decoration: none;
// `;

// const EditButton = styled(ActionButton)`
//   color: #007bff;
// `;

// const DeleteButton = styled(ActionButton)`
//   color: #dc3545;
// `;

// const LogoutButton = styled.button`
//   margin-top: 10px;
// `;

// const AddButton = styled(Link)`
//   margin-top: 10px;
//   text-decoration: none;
// `;

// const ProductImage = styled.img`
//   width: 50px;
//   height: 50px;
//   object-fit: cover;
// `;

// export default SalesProducts;


// NEW Code

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import styled from 'styled-components';
import Decode from '../../utils/Decode';

const USER_PROFILE_ENDPOINT = './api/users/profile';
const USER_PRODUCT_ENDPOINT = './api/products';

const SalesProducts = () => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProfits, setTotalProfits] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          // If not authenticated, redirect to login page
          navigate('/login');
          return;
        }

        // Decode authentication token
        const decodedToken = Decode(authToken);
        if (!decodedToken) {
          setError('Invalid authentication token.');
          return;
        }

        // Fetch user profile
        const responseProfile = await axios.get(USER_PROFILE_ENDPOINT, { headers: { Authorization: `Bearer ${authToken}` } });
        setUser(responseProfile.data);
        setAuth(true);

        // Fetch user's products
        const responseProducts = await axios.get(USER_PRODUCT_ENDPOINT, { headers: { Authorization: `Bearer ${authToken}` } });
        setProducts(responseProducts.data.products);

        // Calculate total revenue and profits
        const totalRev = responseProducts.data.products.reduce((acc, curr) => acc + curr.price, 0);
        setTotalRevenue(totalRev);
        const totalCost = responseProducts.data.products.reduce((acc, curr) => acc + curr.costPrice, 0);
        const totalProfit = totalRev - totalCost;
        setTotalProfits(totalProfit);
      } catch (error) {
        // Handle unauthorized access
        if (error.response && error.response.status === 401) {
          navigate('/login');
          return;
        }
        setError('An error occurred while fetching data.');
      }
    };

    fetchSalesData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setAuth(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <Container className='container mt-4'>
      {error && <Error>{error}</Error>}
      {auth && user && (
        <div>
          <h3>Welcome, {user.firstname}!</h3>
          <SalesSummary>
            {/* <div>Total Sales Revenue: ${totalRevenue.toFixed(2)}</div>
            <div>Total Profits: ${totalProfits.toFixed(2)}</div> */}
          </SalesSummary>
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
                </tr>
              ))}
            </tbody>
          </ProductTable>
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

const SalesSummary = styled.div`
  margin-bottom: 20px;
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

const LogoutButton = styled.button`
  margin-top: 10px;
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;

export default SalesProducts;

