// import React, { useEffect, useState } from 'react';
// import axios from '../../api/axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import Decode from '../../utils/Decode';

// const ORDERS_ENDPOINT = './api/orders/getOrder'; // Assuming this is the correct endpoint
// const USER_PROFILE_ENDPOINT = './api/users/profile';

// const GetCustomerOrder = () => {
//   const { id } = useParams();
//   const [order, setOrder] = useState(null);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const authToken = localStorage.getItem('authToken');
//         if (!authToken) {
//           throw new Error('User authentication failed. Please log in.');
//         }

//         const decodedToken = Decode(authToken);
//         if (!decodedToken || !decodedToken.userId) {
//           throw new Error('Invalid authentication token.');
//         }

//         if (!id) {
//           throw new Error('No order ID provided.');
//         }

//         const orderIdNumber = Number(id);
        

//         const orderResponse = await axios.get(`${ORDERS_ENDPOINT}/${id}`, {
//           headers: {
//             Authorization: `Bearer ${authToken}`
//           }
//         });

//         const userProfileResponse = await axios.get(USER_PROFILE_ENDPOINT, {
//           headers: {
//             Authorization: `Bearer ${authToken}`
//           }
//         });

//         const orderData = orderResponse.data;
//         const userProfile = userProfileResponse.data;

//         if (orderData.userId !== decodedToken.userId) {
//           throw new Error('You are not authorized to view this order.');
//         }

//         setOrder({
//           ...orderData,
//           user: userProfile
//         });
//       } catch (error) {
//         console.error('Error fetching order:', error.message);
//         setError(error.message);
//         if (error.response && error.response.status === 401) {
//           navigate('/login');
//         }
//       }
//     };

//     fetchData();
//   }, [id, navigate]);

//   return (
//     <div className="container mt-4">
//       {error && <div className="alert alert-danger">{error}</div>}
//       {!error && !order && <div className="alert alert-warning">Loading...</div>}
//       {order && (
//         <div>
//           <h3>Order Details</h3>
//           <p>Order ID: {order.orderId}</p>
//           <p>Description: {order.orderDescription}</p>
//           <p>Total: {order.totalAmount}</p>
//           <h4>User</h4>
//           <p>User ID: {order.user?.id}</p>
//           <p>Username: {order.user?.username}</p>
//           <h4>Cart Items</h4>
//           <ul>
//             {order.cartItems.map((item, index) => (
//               <li key={index}>
//                 Product: {item.productName}, Quantity: {item.quantity}, Amount: {item.amount}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GetCustomerOrder;



// NEW CODE


// import React, { useEffect, useState, useCallback } from 'react';
// import axios from '../../api/axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import Decode from '../../utils/Decode';
// import styled from 'styled-components';

// const ORDERS_ENDPOINT = './api/orders';
// const USER_PROFILE_ENDPOINT = './api/users/profile';

// const GetCustomerOrder = () => {
//   const { orderId } = useParams();
//   const [orders, setOrders] = useState([]);
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [order, setOrder] = useState(null);
//   const navigate = useNavigate();

//   const fetchOrders = useCallback(async () => {
//     try {
//       setLoading(true);
//       const authToken = localStorage.getItem('authToken');
//       if (!authToken) {
//         throw new Error('User authentication failed. Please log in.');
//       }

//       const decodedToken = Decode(authToken);
//       if (!decodedToken || !decodedToken.userId) {
//         throw new Error('Invalid authentication token.');
//       }

//       const ordersResponse = await axios.get(`${ORDERS_ENDPOINT}`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`
//         }
//       });

//       console.log('All Orders:', ordersResponse.data);
//       setOrders(ordersResponse.data.orders);
//       //setOrders(ordersResponse.data);

//       const userProfileResponse = await axios.get(`${USER_PROFILE_ENDPOINT}`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`
//         }
//       });

//       console.log('User Profile Response:', userProfileResponse.data);
//       setUser(userProfileResponse.data);
//     } catch (error) {
//       console.error(error);
//       if (error.response && error.response.data && error.response.data.message) {
//         setError(error.response.data.message);
//       } else if (error.message.includes('Network Error')) {
//         setError('There was a network error. Please check your CORS configuration.');
//       } else {
//         setError(error.message);
//       }
//       if (error.response && error.response.status === 401) {
//         navigate('/login');
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, [navigate]);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   return (
//     <Container>
//       {error && (
//         <ErrorAlert aria-live="polite">
//           {error}
//         </ErrorAlert>
//       )}
//       {loading && (
//         <LoadingSpinner>
//           <div className="spinner-border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </LoadingSpinner>
//       )}
//       {!error && !loading && orders.length > 0 && user && (
//         <div>
//           <h3>Your Orders</h3>
//           {orders.map((order, index) => (
//             <OrderDetails key={index}>
//               <h4>Order ID: {order.id}</h4>
//               <p>Description: {order.orderDescription}</p>
//               <p>Total: {order.totalAmount}</p>
//               <h5>User</h5>
//               <p>User ID: {user.id}</p>
//               <p>Username: {user.username}</p>
//               <p>Email: {user.email}</p>
//               <p>Role: {user.role}</p>
//               <h5>Cart Items</h5>
//               <CartItemList>
//                 {order.cartItems.map((item, itemIndex) => (
//                   <CartItem key={itemIndex}>
//                      <ProductImage src={`data:image/jpeg;base64,${item.productImages}`} alt={item.productName} />
//                     <div>
//                     {/* <ProductImage src={item.ProductImages} alt={item.ProductImages} />
//                     <div> */}
//                       <ProductName>{item.productName}</ProductName>
//                       <Quantity>Quantity: {item.quantity}</Quantity>
//                       <Amount>Amount: {item.amount}</Amount>
//                     </div>
//                   </CartItem>
//                 ))}
//               </CartItemList>
//             </OrderDetails>
//           ))}
//         </div>
//       )}
//       {!error && !loading && orders.length === 0 && (
//         <div>
//           <h3>You don't have any orders yet.</h3>
//         </div>
//       )}
//       {!error && !loading && orders.length > 0 && user && orderId && (
//         <div>
//           {orders.some((order) => order.id === parseInt(orderId) && order.userId === user.id) ? (
//             <OrderDetails>
//               {/* Display the order details */}
//             </OrderDetails>
//           ) : (
//             <ErrorAlert>
//               You are not authorized to view this order.
//             </ErrorAlert>
//           )}
//         </div>
//       )}
//     </Container>
//   );
// };

// export default GetCustomerOrder;

// const Container = styled.div`
//   padding: 2rem;
// `;

// const ErrorAlert = styled.div`
//   background-color: #f8d7da;
//   color: #721c24;
//   padding: 1rem;
//   border-radius: 0.25rem;
//   margin-bottom: 1rem;
// `;

// const LoadingSpinner = styled.div`
//   display: flex;
//   justify-content: center;
//   margin: 2rem 0;
// `;

// const OrderDetails = styled.div`
//   background-color: #fff;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   padding: 2rem;
//   border-radius: 0.5rem;
//   margin-bottom: 2rem;
// `;

// const CartItemList = styled.ul`
//   list-style-type: none;
//   padding: 0;
// `;

// const CartItem = styled.li`
//   display: flex;
//   align-items: center;
//   margin-bottom: 1rem;
// `;

// const ProductImage = styled.img`
//   width: 80px;
//   height: 80px;
//   object-fit: cover;
//   border-radius: 0.25rem;
//   margin-right: 1rem;
// `;

// const ProductName = styled.h5`
//   margin: 0;
// `;

// const Quantity = styled.p`
//   margin: 0.25rem 0;
// `;

// const Amount = styled.p`
//   margin: 0;
// `;



// New Testing code


// import React, { useEffect, useState, useCallback } from 'react';
// import axios from '../../api/axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import Decode from '../../utils/Decode';
// import styled from 'styled-components';

// const ORDERS_ENDPOINT = './api/orders';
// const USER_PROFILE_ENDPOINT = './api/users/profile';

// const GetCustomerOrder = () => {
//   const { orderId } = useParams();
//   const [orders, setOrders] = useState([]);
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [personalOrders, setPersonalOrders] = useState([]);
//   const navigate = useNavigate();

//   const fetchOrders = useCallback(async () => {
//     try {
//       setLoading(true);
//       const authToken = localStorage.getItem('authToken');
//       if (!authToken) {
//         throw new Error('User authentication failed. Please log in.');
//       }

//       const decodedToken = Decode(authToken);
//       if (!decodedToken || !decodedToken.userId) {
//         throw new Error('Invalid authentication token.');
//       }

//       const ordersResponse = await axios.get(`${ORDERS_ENDPOINT}`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`
//         }
//       });

//       console.log('All Orders:', ordersResponse.data);
//       setOrders(ordersResponse.data.orders);

//       const userProfileResponse = await axios.get(`${USER_PROFILE_ENDPOINT}`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`
//         }
//       });

//       console.log('User Profile Response:', userProfileResponse.data);
//       setUser(userProfileResponse.data);

//       const userOrders = ordersResponse.data.orders.filter(order => order.user.id === decodedToken.userId);
//       setPersonalOrders(userOrders);
//     } catch (error) {
//       console.error(error);
//       if (error.response && error.response.data && error.response.data.message) {
//         setError(error.response.data.message);
//       } else if (error.message.includes('Network Error')) {
//         setError('There was a network error. Please check your CORS configuration.');
//       } else {
//         setError(error.message);
//       }
//       if (error.response && error.response.status === 401) {
//         navigate('/login');
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, [navigate]);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   return (
//     <Container>
//       {error && (
//         <ErrorAlert aria-live="polite">
//           {error}
//         </ErrorAlert>
//       )}
//       {loading && (
//         <LoadingSpinner>
//           <div className="spinner-border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </LoadingSpinner>
//       )}
//       {!error && !loading && personalOrders.length > 0 && user && (
//         <div>
//           <h3>Your Orders</h3>
//           {personalOrders.map((order, index) => (
//             <OrderDetails key={index}>
//               <h4>Order ID: {order.orderId}</h4>
//               <p>Description: {order.orderDescription}</p>
//               <p>Total: {order.totalAmount}</p>
//               <h5>User</h5>
//               <p>User ID: {user.id}</p>
//               <p>Username: {user.username}</p>
//               <p>Email: {user.email}</p>
//               <p>FirstName: {user.firstname}</p>
//               <h5>Cart Items</h5>
//               <CartItemList>
//                 {order.cartItems.map((item, itemIndex) => (
//                   <CartItem key={itemIndex}>
//                     <ProductImage src={`data:image/jpeg;base64,${item.productImages}`} alt={item.productName} />
//                     <div>
//                       <ProductName>{item.productName}</ProductName>
//                       <Quantity>Quantity: {item.quantity}</Quantity>
//                       <Amount>Amount: {item.amount}</Amount>
//                     </div>
//                   </CartItem>
//                 ))}
//               </CartItemList>
//             </OrderDetails>
//           ))}
//         </div>
//       )}
//       {!error && !loading && personalOrders.length === 0 && (
//         <div>
//           <h3>Hello! {}: You don't have any orders yet.</h3>
//         </div>
//       )}
//       {!error && !loading && orderId && !personalOrders.some(order => order.id === parseInt(orderId)) && (
//         <div>
//           <ErrorAlert>
//             You are not authorized to view this order.
//           </ErrorAlert>
//         </div>
//       )}
//     </Container>
//   );
// };

// export default GetCustomerOrder;

// const Container = styled.div`
//   padding: 2rem;
// `;

// const ErrorAlert = styled.div`
//   background-color: #f8d7da;
//   color: #721c24;
//   padding: 1rem;
//   border-radius: 0.25rem;
//   margin-bottom: 1rem;
// `;

// const LoadingSpinner = styled.div`
//   display: flex;
//   justify-content: center;
//   margin: 2rem 0;
// `;

// const OrderDetails = styled.div`
//   background-color: #fff;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   padding: 2rem;
//   border-radius: 0.5rem;
//   margin-bottom: 2rem;
// `;

// const CartItemList = styled.ul`
//   list-style-type: none;
//   padding: 0;
// `;

// const CartItem = styled.li`
//   display: flex;
//   align-items: center;
//   margin-bottom: 1rem;
// `;

// const ProductImage = styled.img`
//   width: 80px;
//   height: 80px;
//   object-fit: cover;
//   border-radius: 0.25rem;
//   margin-right: 1rem;
// `;

// const ProductName = styled.h5`
//   margin: 0;
// `;

// const Quantity = styled.p`
//   margin: 0.25rem 0;
// `;

// const Amount = styled.p`
//   margin: 0;
// `;



// Styles code here

import React, { useEffect, useState, useCallback } from 'react';
import axios from '../../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import Decode from '../../utils/Decode';
import styled from 'styled-components';

const ORDERS_ENDPOINT = './api/orders';
const USER_PROFILE_ENDPOINT = './api/users/profile';

const GetCustomerOrder = () => {
  const { orderId } = useParams();
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [personalOrders, setPersonalOrders] = useState([]);
  const navigate = useNavigate();

  

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('User authentication failed. Please log in.');
      }

      const decodedToken = Decode(authToken);
      if (!decodedToken || !decodedToken.userId) {
        throw new Error('Invalid authentication token.');
      }

      const ordersResponse = await axios.get(`${ORDERS_ENDPOINT}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      console.log('All Orders:', ordersResponse.data);
      setOrders(ordersResponse.data.orders);

      const userProfileResponse = await axios.get(`${USER_PROFILE_ENDPOINT}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      console.log('User Profile Response:', userProfileResponse.data);
      setUser(userProfileResponse.data);

      const userOrders = ordersResponse.data.orders.filter(order => order.user.id === decodedToken.userId);
      setPersonalOrders(userOrders);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else if (error.message.includes('Network Error')) {
        setError('There was a network error. Please check your CORS configuration.');
      } else {
        setError(error.message);
      }
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const authToken = localStorage.getItem('authToken');
  const decodedToken = Decode(authToken);
  return (
    <Container>
      {error && (
        <ErrorAlert aria-live="polite">
          {error}
        </ErrorAlert>
      )}
      {loading && (
        <LoadingSpinner>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </LoadingSpinner>
      )}
      {!error && !loading && personalOrders.length > 0 && user && (
        <OrderContainer>
          <h3>Your Orders</h3>
          {personalOrders.map((order, index) => (
            <OrderDetails key={index}>
              <h4>Order ID: {order.orderId}</h4>
              <p>Description: {order.orderDescription}</p>
              <p>Total: {order.totalAmount}</p>
              <UserInfo>
                <h5>User Information</h5>
                <p>User ID: {user.id}</p>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>First Name: {user.firstname}</p>
                <p>Role: {decodedToken.roles}</p>
              </UserInfo>
              <h5>Cart Items</h5>
              <CartItemList>
                {order.cartItems.map((item, itemIndex) => (
                  <CartItem key={itemIndex}>
                    <ProductImage src={`data:image/jpeg;base64,${item.productImages}`} alt={item.productName} />
                    <div>
                      <ProductName>{item.productName}</ProductName>
                      <Quantity>Quantity: {item.quantity}</Quantity>
                      <Amount>Amount: {item.amount}</Amount>
                    </div>
                  </CartItem>
                ))}
              </CartItemList>
            </OrderDetails>
          ))}
        </OrderContainer>
      )}
      {!error && !loading && personalOrders.length === 0 && (
        <div>
          <h3>Hello, {user && user.firstname}! You don't have any orders yet.</h3>
        </div>
      )}
      {!error && !loading && orderId && !personalOrders.some(order => order.id === parseInt(orderId)) && (
        <div>
          <ErrorAlert>
            You are not authorized to view this order.
          </ErrorAlert>
        </div>
      )}
    </Container>
  );
};

export default GetCustomerOrder;

const Container = styled.div`
  padding: 2rem;
`;

const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrorAlert = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const OrderDetails = styled.div`
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 800px;
`;

const UserInfo = styled.div`
  margin-bottom: 1rem;
`;

const CartItemList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CartItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.25rem;
  margin-right: 1rem;
`;

const ProductName = styled.h5`
  margin: 0;
`;

const Quantity = styled.p`
  margin: 0.25rem 0;
`;

const Amount = styled.p`
  margin: 0;
`;



