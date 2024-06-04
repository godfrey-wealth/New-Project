// import React, { useEffect, useState, useCallback } from 'react';
// import axios from '../../api/axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import Decode from '../../utils/Decode';
// import styled from 'styled-components';
// import { Container } from 'react-bootstrap';

// const ORDERS_ENDPOINT = './api/orders';
// const USER_PROFILE_ENDPOINT = './api/users/profile';

// const Payments = () => {
//   const { orderId } = useParams();
//   const [orders, setOrders] = useState([]);
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [personalOrders, setPersonalOrders] = useState([]);
//   const [formData, setFormData] = useState({
//     userId: '',
//     firstname: '',
//     address: '',
//     iban: '',
//     totalAmount: 0,
//     payType: '',
//     zipcode: ''
//   });
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

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission, you can send the formData to the server or perform any action as needed
//     console.log(formData);
//   };

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
//         <OrderContainer>
//           <h3>Your Orders</h3>
//           {personalOrders.map((order, index) => (
//             <OrderDetails key={index}>
//               <h4>Order ID: {order.orderId}</h4>
//               <p>Description: {order.orderDescription}</p>
//               <p>Total: {order.totalAmount}</p>
//               <UserInfo>
//                 <h5>User Information</h5>
//                 <p>User ID: {user.id}</p>
//                 <p>Username: {user.username}</p>
//                 <p>Email: {user.email}</p>
//                 <p>First Name: {user.firstname}</p>
//               </UserInfo>
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
//           <Form onSubmit={handleSubmit}>
//             <h3>Update Your Information</h3>
//             <FormGroup>
//               <label htmlFor="userId">User ID:</label>
//               <input type="text" id="userId" name="userId" value={formData.userId} onChange={handleChange} />
//             </FormGroup>
//             <FormGroup>
//               <label htmlFor="firstname">First Name:</label>
//               <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} />
//             </FormGroup>
//             <FormGroup>
//               <label htmlFor="address">Address:</label>
//               <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
//             </FormGroup>
//             <FormGroup>
//               <label htmlFor="iban">IBAN Account:</label>
//               <input type="text" id="iban" name="iban" value={formData.iban} onChange={handleChange} />
//             </FormGroup>
//             <FormGroup>
//               <label htmlFor="totalAmount">Total Amount:</label>
//               <input type="text" id="totalAmount" name="totalAmount" value={formData.totalAmount} onChange={handleChange} />
//             </FormGroup>
//             <FormGroup>
//               <label htmlFor="payType">Payment Type:</label>
//               <input type="text" id="payType" name="payType" value={formData.payType} onChange={handleChange} />
//             </FormGroup>
//             <FormGroup>
//               <label htmlFor="zipcode">ZIP Code:</label>
//               <input type="text" id="zipcode" name="zipcode" value={formData.zipcode} onChange={handleChange} />
//             </FormGroup>
//             <Button type="submit">Submit</Button>
//           </Form>
//         </OrderContainer>
//       )}
//       {!error && !loading && personalOrders.length === 0 && (
//         <div>
//           <h3>Hello, {user && user.username}! You don't have any orders yet.</h3>
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

// export default Payments;




// const OrderContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
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
//   width: 100%;
//   max-width: 800px;
// `;

// const UserInfo = styled.div`
//   margin-bottom: 1rem;
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

// const Form = styled.form`
//   width: 100%;
//   max-width: 800px;
//   margin-top: 2rem;
// `;

// const FormGroup = styled.div`
//   margin-bottom: 1rem;

//   label {
//     display: block;
//     margin-bottom: 0.5rem;
//   }

//   input {
//     width: 100%;
//     padding: 0.5rem;
//     font-size: 1rem;
//     border: 1px solid #ccc;
//     border-radius: 0.25rem;
//   }
// `;

// const Button = styled.button`
//   padding: 0.5rem 1rem;
//   font-size: 1rem;
//   background-color: #007bff;
//   color: #fff;
//   border: none;
//   border-radius: 0.25rem;
//   cursor: pointer;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;


// New code

// import React, { useEffect, useState, useCallback } from 'react';
// import axios from '../../api/axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import Decode from '../../utils/Decode';
// import styled from 'styled-components';
// import { Container as BootstrapContainer, Container } from 'react-bootstrap';

// const ORDERS_ENDPOINT = './api/orders';
// const USER_PROFILE_ENDPOINT = './api/users/profile';

// const Payments = () => {
//   const { orderId } = useParams();
//   const [orders, setOrders] = useState([]);
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [personalOrders, setPersonalOrders] = useState([]);
//   const [formData, setFormData] = useState({
//     userId: '',
//     firstname: '',
//     address: '',
//     iban: '',
//     totalAmount: 0,
//     payType: '',
//     zipcode: ''
//   });
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

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission, you can send the formData to the server or perform any action as needed
//     console.log(formData);
//   };

//   return (
    
  
//     <StyledContainer>
       
//       <ContentContainer>
//         <OrderContainer>
//           {error && (
//             <ErrorAlert aria-live="polite">
//               {error}
//             </ErrorAlert>
//           )}
//           {loading && (
//             <LoadingSpinner>
//               <div className="spinner-border" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//             </LoadingSpinner>
//           )}
//           {!error && !loading && personalOrders.length > 0 && user && (
//             <>
//               <h3>Your Orders</h3>
//               {personalOrders.map((order, index) => (
//                 <OrderDetails key={index}>
//                   <h4>Order ID: {order.orderId}</h4>
//                   <p>Description: {order.orderDescription}</p>
//                   <p>Total: {order.totalAmount}</p>
//                   <UserInfo>
//                     <h5>User Information</h5>
//                     <p>User ID: {user.id}</p>
//                     <p>Username: {user.username}</p>
//                     <p>Email: {user.email}</p>
//                     <p>First Name: {user.firstname}</p>
//                   </UserInfo>
//                   <h5>Cart Items</h5>
//                   <CartItemList>
//                     {order.cartItems.map((item, itemIndex) => (
//                       <CartItem key={itemIndex}>
//                         <ProductImage src={`data:image/jpeg;base64,${item.productImages}`} alt={item.productName} />
//                         <div>
//                           <ProductName>{item.productName}</ProductName>
//                           <Quantity>Quantity: {item.quantity}</Quantity>
//                           <Amount>Amount: {item.amount}</Amount>
//                         </div>
//                       </CartItem>
//                     ))}
//                   </CartItemList>
//                 </OrderDetails>
//               ))}
//             </>
//           )}
//           {!error && !loading && personalOrders.length === 0 && (
//             <div>
//               <h3>Hello, {user && user.username}! You don't have any orders yet.</h3>
//             </div>
//           )}
//           {!error && !loading && orderId && !personalOrders.some(order => order.id === parseInt(orderId)) && (
//             <div>
//               <ErrorAlert>
//                 You are not authorized to view this order.
//               </ErrorAlert>
//             </div>
//           )}
//         </OrderContainer>
//         <FormContainer>
//           <Form onSubmit={handleSubmit}>
//             <h3>Update Your Information</h3>
//             <FormGroup>
//               <label htmlFor="userId">User ID:</label>
//               <input type="text" id="userId" name="userId" value={formData.userId} onChange={handleChange} />
//             </FormGroup>
//             <FormGroup>
//               <label htmlFor="firstname">First Name:</label>
//               <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} />
//             </FormGroup>
//             <FormGroup>
//               <label htmlFor="address">Address:</label>
//               <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
//             </FormGroup>
//             <FormGroup>
//               <label htmlFor="iban">IBAN Account:</label>
//               <input type="text" id="iban" name="iban" value={formData.iban} onChange={handleChange} />
//             </FormGroup>
//             <FormGroup>
//               <label htmlFor="totalAmount">Total Amount:</label>
//               <input type="text" id="totalAmount" name="totalAmount" value={formData.totalAmount || (personalOrders.length > 0 && personalOrders[0].totalAmount)} onChange={handleChange} readOnly/>
//               {/* <input type="text" id="totalAmount" name="totalAmount" value={formData.totalAmount} onChange={handleChange} /> */}
//             </FormGroup>
//             <label htmlFor="payType">Payment Type:</label>
//          <StyledSelect id="payType" name="payType" value={formData.payType} onChange={handleChange}>
//         <option value="">Select Payment Type</option>
//         <option value="CASH">Cash</option>
//           <option value="CARD">Card</option>
//          </StyledSelect>
//             {/* <FormGroup>
//               <label htmlFor="payType">Payment Type:</label>
//               <input type="text" id="payType" name="payType" value={formData.payType} onChange={handleChange} />
//             </FormGroup> */}
//             <FormGroup>
//               <label htmlFor="zipcode">ZIP Code:</label>
//               <input type="text" id="zipcode" name="zipcode" value={formData.zipcode} onChange={handleChange} />
//             </FormGroup>
//             <Button type="submit">Submit</Button>
//           </Form>
//         </FormContainer>
//       </ContentContainer>
//       </StyledContainer>
//   );
// };

// export default Payments;

// const StyledContainer = styled(BootstrapContainer)`
//   padding: 2rem;
// `;

// const ContentContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

// const OrderContainer = styled.div`
//   flex: 1;
// `;

// const FormContainer = styled.div`
//   flex: 1;
//   margin-left: 2rem;
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
//   width: 100%;
//   max-width: 800px;
// `;

// const UserInfo = styled.div`
//   margin-bottom: 1rem;
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

// const Form = styled.form`
//   width: 100%;
//   max-width: 400px;
// `;

// const FormGroup = styled.div`
//   margin-bottom: 1rem;

//   label {
//     display: block;
//     margin-bottom: 0.5rem;
//   }

//   input {
//     width: 100%;
//     padding: 0.5rem;
//     font-size: 1rem;
//     border: 1px solid #ccc;
//     border-radius: 0.25rem;
//   }
// `;

// const StyledSelect = styled.select`
//   width: 100%;
//   padding: 0.5rem;
//   font-size: 1rem;
//   border: 1px solid #ccc;
//   border-radius: 0.25rem;
//   appearance: none;
//   background-image: url('data:image/svg+xml;utf8,<svg fill="%23333" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>');
//   background-repeat: no-repeat;
//   background-position: right 0.7rem center;
//   background-size: 1.5em;
// `;

// const Button = styled.button`
//   padding: 0.5rem 1rem;
//   font-size: 1rem;
//   background-color: #007bff;
//   color: #fff;
//   border: none;
//   border-radius: 0.25rem;
//   cursor: pointer;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const StyledContainer = styled(BootstrapContainer)`
//   padding: 2rem;
// `;

// const ContentContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

// const OrderContainer = styled.div`
//   flex: 1;
// `;

// const FormContainer = styled.div`
//   flex: 1;
//   margin-left: 2rem;
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
//   width: 100%;
//   max-width: 800px;
// `;

// const UserInfo = styled.div`
//   margin-bottom: 1rem;
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

// const Form = styled.form`
//   width: 100%;
//   max-width: 400px;
// `;

// const FormGroup = styled.div`
//   margin-bottom: 1rem;

//   label {
//     display: block;
//     margin-bottom: 0.5rem;
//   }

//   input {
//     width: 100%;
//     padding: 0.5rem;
//     font-size: 1rem;
//     border: 1px solid #ccc;
//     border-radius: 0.25rem;
//   }
// `;

// const Button = styled.button`
//   padding: 0.5rem 1rem;
//   font-size: 1rem;
//   background-color: #007bff;
//   color: #fff;
//   border: none;
//   border-radius: 0.25rem;
//   cursor: pointer;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

//export default Payments;



/// New Changes

// import React, { useEffect, useState, useCallback } from 'react';
// import axios from '../../api/axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import Decode from '../../utils/Decode';
// import styled from 'styled-components';
// import { Container as BootstrapContainer } from 'react-bootstrap';

// const ORDERS_ENDPOINT = './api/orders';
// const USER_PROFILE_ENDPOINT = './api/users/profile';
// const PAYMENT_ENDPOINT = './api/payments';

// const Payments = () => {
//   const { orderId } = useParams();
//   const [orders, setOrders] = useState([]);
 
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [personalOrders, setPersonalOrders] = useState([]);
//   const [user, setUser] = useState({
//     userId: "",
//     firstname: ""
//   });
//   const [formData, setFormData] = useState({
    
//     address: '',
//     iban: '',
//     totalAmount: FormData.totalAmount,
//     payType: '',
//     zipcode: '',
//     data: ''
    
//   });

  
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

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const authToken = localStorage.getItem('authToken');
//       if (!authToken) {
//         throw new Error('User authentication failed. Please log in.');
//       }
  
//       const response = await axios.post(PAYMENT_ENDPOINT, formData, {
//         headers: {
//           Authorization: `Bearer ${authToken}`
//         }
//       });
  
//       console.log('Payment successful:', response.data);
//       navigate("/suc")
//       // Optionally, you can reset the form data here
//       setFormData({
//         // userId: user.id,
//         // firstname: user.firstname,
//         address: '',
//         iban: '',
//         totalAmount: formData.totalAmount,
//         payType: '',
//         zipcode: ''
//       });
//       setUser({
//         userId: "",
//         firstname: ""
//       });
//       // Display a success message or perform any other actions as needed
//     } catch (error) {
//       console.error('Payment failed:', error);
//       // Handle errors, display error message, etc.
//       if (error.response && error.response.data && error.response.data.message) {
//         setError(error.response.data.message);
//       } else {
//         setError('An error occurred while processing the payment.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!localStorage.getItem('authToken')) {
//     return <ErrorContainer>User authentication failed. Please log in.</ErrorContainer>;
//   }

//   return (
//     <StyledContainer>
//       <ContentContainer>
//         <OrderContainer>
//           {error && (
//             <ErrorAlert aria-live="polite">
//               {error}
//             </ErrorAlert>
//           )}
//           {loading && (
//             <LoadingSpinner>
//               <div className="spinner-border" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//             </LoadingSpinner>
//           )}
//           {!error && !loading && personalOrders.length > 0 && user && (
//             <>
//               <h3>Your Orders</h3>
//               {personalOrders.map((order, index) => 
//                 <OrderDetails key={index}>
//                   <h4>Order ID: {order.orderId}</h4>
//                   <p>Description: {order.orderDescription}</p>
//                   <p>TotalAmount: €{order.totalAmount}</p>
//                   <UserInfo>
//                     <h5>User Information</h5>
//                     <p>User ID: {user.id}</p>
//                     <p>Username: {user.username}</p>
//                     <p>Email: {user.email}</p>
//                     <p>First Name: {user.firstname}</p>
//                   </UserInfo>
//                   <h5>Cart Items</h5>
//                   <CartItemList>
//                     {order.cartItems.map((item, itemIndex) => (
//                       <CartItem key={itemIndex}>
//                         <ProductImage src={`data:image/jpeg;base64,${item.productImages}`} alt={item.productName} />
//                         <div>
//                           <ProductName>{item.productName}</ProductName>
//                           <Quantity>Quantity: {item.quantity}</Quantity>
//                           <Amount>Amount: {item.amount}</Amount>
//                         </div>
//                       </CartItem>
//                     ))}
//                   </CartItemList>
//                 </OrderDetails>
//               )}
//             </>
//           )}
//           {!error && !loading && personalOrders.length === 0 && (
//             <div>
//               <h3>Hello, {user && user.firstname}! You don't have any orders yet.</h3>
//             </div>
//           )}
//           {!error && !loading && orderId && !personalOrders.some(order => order.id ===  parseInt(orderId)) && (
//             <div>
//               <ErrorAlert>
//                 You are not authorized to view this order.
//               </ErrorAlert>
//             </div>
//           )}
//         </OrderContainer>
//         <FormContainer>
//           <Form onSubmit={handleSubmit}>
//             <h3>Update Your Information</h3>
//             <FormGroup>
//               <label htmlFor="userId">User ID:</label>
//               <input type="text" id="userId" name="userId" value={user.id} onChange={handleChange} readOnly />
//             </FormGroup>
//             <FormGroup>
//               <label htmlFor="firstname">First Name:</label>
//               <input type="text" id="firstname" name="firstname" value={user.firstname} onChange={handleChange} readOnly />
//             </FormGroup>
//             <FormGroup>
//               <label htmlFor="address">Address:</label>
//               <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
//             </FormGroup>
//             <FormGroup>
//               <label htmlFor="iban">IBAN Account:</label>
//               <input type="text" id="iban" name="iban" value={formData.iban} onChange={handleChange} />
//             </FormGroup>
//             <FormGroup>
//               <label htmlFor="totalAmount">Total Amount:</label>
//               <input type="text" id="totalAmount" name="totalAmount" value={formData.totalAmount || (personalOrders.length > 0 && personalOrders[0].totalAmount)} onChange={handleChange} readOnly />
//             </FormGroup>
//             <FormGroup>
//               <label htmlFor="payType">Payment Type:</label>
//               <StyledSelect id="payType" name="payType" value={formData.payType} onChange={handleChange}>
//                 <option value="">Select Payment Type</option>
//                 <option value="CASH">Cash</option>
//                 <option value="CARD">Card</option>
//               </StyledSelect>
//             </FormGroup>
            
//         <FormGroup>
//         <label htmlFor="date">Date:</label>
//         <ReadOnlyInput type="date" id="address" name="address" value={formData.address} onChange={handleChange} />
//           </FormGroup>
//             <FormGroup>
//               <label htmlFor="zipcode">ZIP Code:</label>
//               <input type="text" id="zipcode" name="zipcode" value={formData.zipcode} onChange={handleChange} />
//             </FormGroup>
//             <Button type="submit">Submit</Button>
//           </Form>
//         </FormContainer>
//       </ContentContainer>
//     </StyledContainer>
//   );
// };

// const StyledContainer = styled(BootstrapContainer)`
//   padding: 2rem;
// `;

// const ContentContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

// const OrderContainer = styled.div`
//   flex: 1;
// `;

// const FormContainer = styled.div`
//   flex: 1;
//   margin-left: 2rem;
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
//   width: 100%;
//   max-width: 800px;
// `;

// const UserInfo = styled.div`
//   margin-bottom: 1rem;
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

// const Form = styled.form`
//   width: 100%;
//   max-width: 400px;
// `;

// const FormGroup = styled.div`
//   margin-bottom: 1rem;

//   label {
//     display: block;
//     margin-bottom: 0.5rem;
//   }

//   input {
//     width: 100%;
//     padding: 0.5rem;
//     font-size: 1rem;
//     border: 1px solid #ccc;
//     border-radius: 0.25rem;
//   }
// `;

// const StyledSelect = styled.select`
//   width: 100%;
//   padding: 0.5rem;
//   font-size: 1rem;
//   border: 1px solid #ccc;
//   border-radius: 0.25rem;
//   appearance: none;
//   background-image: url('data:image/svg+xml;utf8,<svg fill="%23333" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>');
//   background-repeat: no-repeat;
//   background-position: right 0.7rem center;
//   background-size: 1.5em;
// `;

// const Button = styled.button`
//   padding: 0.5rem 1rem;
//   font-size: 1rem;
//   background-color: #007bff;
//   color: #fff;
//   border: none;
//   border-radius: 0.25rem;
//   cursor: pointer;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const ErrorContainer = styled.div`
//    padding: 2rem;
//   text-align: center;
//   background-color: #f8d7da;
//   color: #721c24;
//   border-radius: 0.25rem;
//   margin-bottom: 1rem;
// `;

// const ReadOnlyInput = styled.input`
//   width: 100%;
//   padding: 0.5rem;
//   font-size: 1rem;
//   border: 1px solid #ccc;
//   border-radius: 0.25rem;
//   background-color: #f4f4f4; /* Light gray background */
//   color: #555; /* Dark gray text color */
//   cursor: not-allowed; /* Change cursor to indicate non-editable */
// `;

// export default Payments;


// import React, { useEffect, useState, useCallback, useContext } from 'react';
// import axios from '../../api/axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import Decode from '../../utils/Decode';
// import styled from 'styled-components';
// import { Container as BootstrapContainer } from 'react-bootstrap';
// import { CartContext } from './ProductStore/CartContext';

// const ORDERS_ENDPOINT = './api/orders';
// const USER_PROFILE_ENDPOINT = './api/users/profile';
// const PAYMENT_ENDPOINT = './api/payments';

// const Payments = () => {
//   const { orderId } = useParams();
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [personalOrders, setPersonalOrders] = useState([]);
//   const cart = useContext(CartContext)
//   const [user, setUser] = useState({
//     id: "",
//     firstname: ""
//   });
//   const [formData, setFormData] = useState({
//      userid: user.id,
//     firstname: user.firstname,
//     address: '',
//     ibanCardno: '',
//     totalAmount: "",
//     type: '',
//     zipcode: '',
//     date: ''
//   });

//   const[order, setOrder] = useState({
//     totalAmount: ""
//   })
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

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: name === 'totalAmount' ? parseFloat(value) : value
//       //[name]: value
//     }));
     
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const authToken = localStorage.getItem('authToken');
//       if (!authToken) {
//         throw new Error('User authentication failed. Please log in.');
//       }
  
//       // Make sure formData contains all necessary fields
//       // const formData = {
//       //   userid: "", // Populate with correct user ID
//       //   firstname: "", // Populate with correct first name
//       //   address: '', // Populate with correct address
//       //   ibanCardno: '', // Populate with correct IBAN/Card number
//       //   totalAmount: 0, // Populate with correct total amount
//       //   payType: '', // Populate with correct payment type
//       //   zipcode: '', // Populate with correct zipcode
//       //   date: '' // Populate with correct date
//       // };
  
//       const response = await axios.post(PAYMENT_ENDPOINT, formData, {
//         headers: {
//           Authorization: `Bearer ${authToken}`
//         }
//       });
  
//       console.log('Payment successful:', response.data);
//       navigate("/suc");
//       // Optionally, you can reset the form data here
//       setFormData({
//         userid: user.id,
//         firstname: user.firstname,
//         address: '',
//         ibanCardno: '',
//         totalAmount: 0,
//         payType: '',
//         zipcode: '',
//         date: ''
//       });
//       setUser({
//         id: "",
//         firstname: ""
//       });
//       // Display a success message or perform any other actions as needed
//     } catch (error) {
//       console.error('Payment failed:', error);
//       // Handle errors, display error message, etc.
//       if (error.response && error.response.data && error.response.data.message) {
//         setError(error.response.data.message);
//       } else {
//         setError('An error occurred while processing the payment.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
  
  
//   if (!localStorage.getItem('authToken')) {
//     return <ErrorContainer>User authentication failed. Please log in.</ErrorContainer>;
//   }

//   return (
//     <StyledContainer>
//       <ContentContainer>
//         <OrderContainer>
//           {error && (
//             <ErrorAlert aria-live="polite">
//               {error}
//             </ErrorAlert>
//           )}
//           {loading && (
//             <LoadingSpinner>
//               <div className="spinner-border" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//             </LoadingSpinner>
//           )}
//           {!error && !loading && personalOrders.length > 0 && user && (
//             <>
//               <h3>Your Orders</h3>
//               {personalOrders.map((order, index) => 
//                 <OrderDetails key={index}>
//                   <h4>Order ID: {order.orderId}</h4>
//                   <p>Description: {order.orderDescription}</p>
//                   <p>TotalAmount: {order.totalAmount}</p>
//                   <UserInfo>
//                     <h5>User Information</h5>
//                     <p>User ID: {user.id}</p>
//                     <p>Username: {user.username}</p>
//                     <p>Email: {user.email}</p>
//                     <p>First Name: {user.firstname}</p>
//                   </UserInfo>
//                   <h5>Cart Items</h5>
//                   <CartItemList>
//                     {order.cartItems.map((item, itemIndex) => (
//                       <CartItem key={itemIndex}>
//                         <ProductImage src={`data:image/jpeg;base64,${item.productImages}`} alt={item.productName} />
//                         <div>
//                           <ProductName>{item.productName}</ProductName>
//                           <Quantity>Quantity: {item.quantity}</Quantity>
//                           <Amount>Amount: {item.amount}</Amount>
//                         </div>
//                       </CartItem>
//                     ))}
//                   </CartItemList>
//                 </OrderDetails>
//               )}
//             </>
//           )}
//           {!error && !loading && personalOrders.length === 0 && (
//             <div>
//               <h3>Hello, {user && user.firstname}! You don't have any orders yet.</h3>
//             </div>
//           )}
//           {!error && !loading && orderId && !personalOrders.some(order => order.id ===  parseInt(orderId)) && (
//             <div>
//               <ErrorAlert>
//                 You are not authorized to view this order.
//               </ErrorAlert>
//             </div>
//           )}
//         </OrderContainer>
//         <FormContainer>
//           <Form onSubmit={handleSubmit}>
//             <h3>Update Your Information</h3>
//             <FormGroup>
//               <label htmlFor="userid">User ID:</label>
//               <input type="text" id="userid" name="userid" value={FormData.userid} onChange={handleChange} />
//             </FormGroup>
//             <FormGroup>
//               <label htmlFor="firstname">First Name:</label>
//               <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} />
//             </FormGroup>
//             <FormGroup>
//               <label htmlFor="address">Address:</label>
//               <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
//             </FormGroup>
//             <FormGroup>
//               <label htmlFor="ibanCardno">IBAN Account:</label>
//               <input type="text" id="ibanCardno" name="ibanCardno" value={formData.ibanCardno} onChange={handleChange} />
//             </FormGroup>
//             <FormGroup>
//               <label htmlFor="totalAmount">Total Amount:</label>
//               <input type="text" id="totalAmount" name="totalAmount" value={formData.totalAmount} onChange={handleChange} />
//             </FormGroup>
//             {/* <FormGroup>
//               <label htmlFor="totalAmount">Total Amount:</label>
//               <input type="text" id="totalAmount" name="totalAmount" value={formData.totalAmount || (personalOrders.length > 0 && personalOrders[0]?.totalAmount) || ""} onChange={handleChange} />
//             </FormGroup> */}
           
//             <FormGroup>
//               <label htmlFor="payType">Payment Type:</label>
//               <StyledSelect id="type" name="type" value={formData.type} onChange={handleChange}>
//                 <option value="">Select Payment Type</option>
//                 <option value="CASH">Cash</option>
//                 <option value="CARD">Card</option>
//               </StyledSelect>
//             </FormGroup>
//             <FormGroup>
//               <label htmlFor="date">Date:</label>
//               <ReadOnlyInput type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
//             </FormGroup>
//             <FormGroup>
//               <label htmlFor="zipcode">ZIP Code:</label>
//               <input type="text" id="zipcode" name="zipcode" value={formData.zipcode} onChange={handleChange} />
//             </FormGroup>
//             <Button type="submit">Submit</Button>
//           </Form>
//         </FormContainer>
//       </ContentContainer>
//     </StyledContainer>
//   );
// };

// const StyledContainer = styled(BootstrapContainer)`
//   padding: 2rem;
// `;

// const ContentContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

// const OrderContainer = styled.div`
//   flex: 1;
// `;

// const FormContainer = styled.div`
//   flex: 1;
//   margin-left: 2rem;
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
//   width: 100%;
//   max-width: 800px;
// `;

// const UserInfo = styled.div`
//   margin-bottom: 1rem;
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

// const Form = styled.form`
//   width: 100%;
//   max-width: 400px;
// `;

// const FormGroup = styled.div`
//   margin-bottom: 1rem;

//   label {
//     display: block;
//     margin-bottom: 0.5rem;
//   }

//   input, select {
//     width: 100%;
//     padding: 0.5rem;
//     font-size: 1rem;
//     border: 1px solid #ccc;
//     border-radius: 0.25rem;
//   }
// `;

// const StyledSelect = styled.select`
//   ${FormGroup} /* Inherit styles from FormGroup */
//   appearance: none;
//   background-image: url('data:image/svg+xml;utf8,<svg fill="%23333" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>');
//   background-repeat: no-repeat;
//   background-position: right 0.7rem center;
//   background-size: 1
//   .5em;
//   `;
  
//   const Button = styled.button`
//   padding: 0.5rem 1rem;
//   font-size: 1rem;
//   background-color: #007bff;
//   color: #fff;
//   border: none;
//   border-radius: 0.25rem;
//   cursor: pointer;
  
//   &:hover {
//   background-color: #0056b3;
//   }
//   `;
  
//    const ErrorContainer = styled.div `
//   padding: 2rem;
//    text-align: center;
//     background-color: #f8d7da;
//      color: #721c24;
//       border-radius: 0.25rem;
      
//     margin-bottom: 1rem;

//     `
  
//   //   const FormGroup = styled.div`
//   //   /* Styles for FormGroup can be defined here */
//   // `;
  
//   // const ErrorContainer = styled.div`
//   //   padding: 2rem;
//   //   text-align: center;
//   //   background-color: #f8d7da;
//   //   color: #721c24;
//   //   border-radius: 0.25rem;
//   //   margin-bottom: 1rem;
//   // `;
  
//   const ReadOnlyInput = styled.input`
//     ${FormGroup} /* Inherit styles from FormGroup */
//     background-color: #f4f4f4; /* Light gray background */
//     color: #555; /* Dark gray text color */
//     cursor: not-allowed; /* Change cursor to indicate non-editable */
//   `;
//   export default Payments;




// // JUST TRYING CODE


import React, { useEffect, useState, useCallback, useContext } from 'react';
import axios from '../../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import Decode from '../../utils/Decode';
import styled from 'styled-components';
import { Container as BootstrapContainer } from 'react-bootstrap';
import { CartContext } from './ProductStore/CartContext';


// Import Visa and MasterCard images
import visaIcon from '../CUSTOMERS/assets/mastercardIcon.jpg';
import mastercardIcon from '../CUSTOMERS/assets/visaIcon.jpg';




const ORDERS_ENDPOINT = './api/orders';
const USER_PROFILE_ENDPOINT = './api/users/profile';
const PAYMENT_ENDPOINT = './api/payments';

const Payments = () => {
  const { orderId } = useParams();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [personalOrders, setPersonalOrders] = useState([]);
  const cart = useContext(CartContext);
  const [user, setUser] = useState({
    id: "",
    firstname: ""
  });
  const [formData, setFormData] = useState({
    userid: '',
    firstname: '',
    address: '',
    ibanCardno: '',
    totalAmount: '',
    type: '',
    zipcode: '',
    date: ''
  });

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

      setOrders(ordersResponse.data.orders);

      const userProfileResponse = await axios.get(`${USER_PROFILE_ENDPOINT}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('User authentication failed. Please log in.');
      }

      const response = await axios.post(PAYMENT_ENDPOINT, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      navigate("/suc");
      setFormData({
        userid: user.id,
        firstname: user.firstname,
        address: '',
        ibanCardno: '',
        totalAmount: 0,
        type: '',
        zipcode: '',
        date: ''
      });
      setUser({
        id: "",
        firstname: ""
      });
    } catch (error) {
      console.error('Payment failed:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred while processing the payment.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  if (!localStorage.getItem('authToken')) {
    return <ErrorContainer>User authentication failed. Please log in.</ErrorContainer>;
  }

  return (
    <StyledContainer>
      <ContentContainer>
        <OrderContainer>
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
            <>
              <h3>Your Orders</h3>
              {personalOrders.map((order, index) => 
                <OrderDetails key={index}>
                  {/* Order details rendering */}
                  <h4>Order ID: {order.orderId}</h4>
                  <p>Description: {order.orderDescription}</p>
                  <p>TotalAmount: {order.totalAmount}</p>
                 <UserInfo><h5>User Information</h5>
                     <p>User ID: {user.id}</p>
                   <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>First Name: {user.firstname}</p>
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
              )}
            </>
          )}
          {!error && !loading && personalOrders.length === 0 && (
            <div>
              <h3>Hello, {user && user.firstname}! You don't have any orders yet.</h3>
            </div>
          )}
          {!error && !loading && orderId && !personalOrders.some(order => order.id ===  parseInt(orderId))
          && (
            <div>
              <ErrorAlert>
                You are not authorized to view this order.
              </ErrorAlert>
            </div>
          )}
        </OrderContainer>
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <h3>Update Your Information</h3>
            <FormGroup>
              <label htmlFor="userid">User ID:</label>
              <input type="text" id="userid" name="userid" value={formData.userid} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="firstname">First Name:</label>
              <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="address">Address:</label>
              <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="ibanCardno">IBAN Account:</label>
              <input type="text" id="ibanCardno" name="ibanCardno" value={formData.ibanCardno} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="totalAmount">Total Amount:</label>
              <input type="text" id="totalAmount" name="totalAmount" value={formData.totalAmount} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="type">Payment Type:</label>
              <StyledSelect id="type" name="type" value={formData.type} onChange={handleChange}>
                <option value="">Select Payment Type</option>
                <option value="CASH">Cash</option>
                <option value="CARD">Card</option>
              </StyledSelect>
              {/* Styled card icons for Visa and MasterCard */}
              <CardIcons>
                <img src={visaIcon} alt="Visa Card" />
                <img src={mastercardIcon} alt="MasterCard" />
              </CardIcons>
            </FormGroup>
            <FormGroup>
              <label htmlFor="date">Date:</label>
              <ReadOnlyInput type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="zipcode">ZIP Code:</label>
              <input type="text" id="zipcode" name="zipcode" value={formData.zipcode} onChange={handleChange} />
            </FormGroup>
            <Button type="submit">Submit</Button>
          </form>
        </FormContainer>
      </ContentContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled(BootstrapContainer)`
  padding: 2rem;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const OrderContainer = styled.div`
  flex: 1;
`;

const FormContainer = styled.div`
  flex: 1;
  margin-left: 2rem;
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

const FormGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input, select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
  }
`;

const StyledSelect = styled.select`
  ${FormGroup} /* Inherit styles from FormGroup */
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="%23333" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 0.7rem center;
  background-size: 1.5em;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ReadOnlyInput = styled.input`
  ${FormGroup} /* Inherit styles from FormGroup */
  background-color: #f4f4f4; /* Light gray background */
  color: #555; /* Dark gray text color */
  cursor: not-allowed; /* Change cursor to indicate non-editable */
`;

const CardIcons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;

  img {
    width: 40px;
    height: 24px;
  }
`;

const ErrorContainer = styled.div`
  padding: 2rem;
  text-align: center;
  background-color: #f8d7da;
  color: #721c24;
  border-radius: 0.25rem;
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

const Quantity = styled.p`
  margin: 0.25rem 0;
`;

const Amount = styled.p`
  margin: 0;
`;
export default Payments;
