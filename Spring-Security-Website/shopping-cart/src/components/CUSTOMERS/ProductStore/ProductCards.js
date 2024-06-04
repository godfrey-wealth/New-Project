// import React, { useContext } from 'react';
// import { CartContext } from './CartContext';
// import { Card } from 'react-bootstrap';

// function ProductCards(props) {
//   const product = props.product;
//   const cart = useContext(CartContext);

//   const getProductQuantity = cart.getProductQuantity(product.productId);

//   return (
//     <div>
//       <Card>
//         <Card.Body>
//           <Card.Title>{product.name}</Card.Title>
//           <p>Product ID: {product.productId}</p>
//           <p>Product Quantity in Cart: {getProductQuantity}</p>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }

// export default ProductCards;


// import React, { useState, useEffect, useContext } from 'react';
// import { Card, Button } from 'react-bootstrap';
// import { CartContext } from './CartContext';
// import axios from '../../../api/axios';
// import Decode from '../../../utils/Decode';
// import { Link } from 'react-router-dom';

// const USER_PROFILE_ENDPOINT = './api/users/profile';
// const PRODUCTS_ENDPOINT = './api/products';

// function ProductCards() {
//   const cart = useContext(CartContext);
//   const [auth, setAuth] = useState(false);
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);
//   const [products, setProducts] = useState([]);

//   // Method to fetch all products
//   const fetchProducts = () => {
//     axios.get(PRODUCTS_ENDPOINT)
//       .then(response => {
//         setProducts(response.data.products); // Access the products array from the response
//       })
//       .catch(error => {
//         console.error('Error fetching products:', error);
//       });
//   };

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

//     // Fetch products
//     fetchProducts();

//   }, []);

//   // Check if the user is authenticated
//   const isAuthenticated = auth;

//   // Check if the user is authorized to view the product cards
//   const isAuthorized = true; // Replace this with your authorization logic

//   if (!isAuthenticated) {
//     return (
//       <div className="text-center">
//         <p>Please log in to view the product cards.</p>
//         <Link to={"/login"} className="btn btn-primary">Login</Link>
//       </div>
//     );
//   }

//   if (!isAuthorized) {
//     return <p>You are not authorized to view the product cards.</p>;
//   }

//   return (
//     <div className="row row-cols-1 row-cols-md-3 g-4">
//       {products.map(product => (
//         <div key={product.productId} className="col">
//           <Card>
//             <Card.Body>
//             <Card.Text>{product.prodImage}</Card.Text>
//               <Card.Title>{product.name}</Card.Title>
//               <Card.Text>{product.price}</Card.Text>
//               <Card.Text>{product.category}</Card.Text>
//               <p>Product Quantity in Cart: {cart.getProductQuantity(product.productId)}</p>
//               {cart.getProductQuantity(product.productId) > 0 ?
//                 <Button variant="danger" onClick={() => cart.removeOneFromCart(product.productId)}>Remove One</Button>
//                 :
//                 null
//               }
//             </Card.Body>
//           </Card>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ProductCards;



// Test Update code

// import React, { useState, useEffect, useContext } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Card, Button, Form, Row, Col } from 'react-bootstrap'; // Import Row from react-bootstrap
// import { CartContext } from './CartContext';
// import axios from '../../../api/axios';
// import Decode from '../../../utils/Decode';
// import { Link } from 'react-router-dom';
// import './ProductCards.css'; // Import the CSS file for styling

// const USER_PROFILE_ENDPOINT = './api/users/profile';
// const PRODUCTS_ENDPOINT = './api/products';

// function ProductCards() {
//   const cart = useContext(CartContext);
//   const [auth, setAuth] = useState(false);
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);
//   const [products, setProducts] = useState([]);

//   // Method to fetch all products
//   const fetchProducts = () => {
//     axios.get(PRODUCTS_ENDPOINT)
//       .then(response => {
//         setProducts(response.data.products); // Access the products array from the response
//       })
//       .catch(error => {
//         console.error('Error fetching products:', error);
//       });
//   };

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

//     // Fetch products
//     fetchProducts();

//   }, []);

//   // Check if the user is authenticated
//   const isAuthenticated = auth;

//   // Check if the user is authorized to view the product cards
//   const isAuthorized = true; // Replace this with your authorization logic

//   if (!isAuthenticated) {
//     return (
//       <div className="text-center">
//         <p>Please log in to view the product cards.</p>
//         <Link to={"/login"} className="btn btn-primary">Login</Link>
//       </div>
//     );
//   }

//   if (!isAuthorized) {
//     return <p>You are not authorized to view the product cards.</p>;
//   }

//   return (
//     <div className="row row-cols-1 row-cols-md-3 g-4">
//       {products.map(product => (
//         <div key={product.productId} className="col">
//           <Card className="product-card">
//             <div className="prod-image-container">
//               <Card.Img
//                 variant="top"
//                 src={`data:image/jpeg;base64,${product.prodImage}`}
//                 alt={product.name}
//                 className="prod-image"
//               />
//             </div>
//             <Card.Body>
//               <Card.Title>{product.name}</Card.Title>
//               <Card.Text>Category: {product.category}</Card.Text>
//               <Card.Text>Price: {product.price}</Card.Text>
//               {cart.getProductQuantity(product.productId) > 0 ? (
//                 <>
//                   {/* Display a message or any other content */}
//                   <Form as={Row}>
//                     <Form.Label column sm="6">In Cart: {cart.getProductQuantity(product.productId)}</Form.Label>
//                     <Col sm="8">
//                       <Button sm="6" onClick={()=>cart.addOneToCart(product.productId)} className='mx-2'>+</Button>
//                       <Button sm="6" onClick={()=>cart.removeOneFromCart(product.productId)} className='mx-2'>-</Button>
//                     </Col>
//                   </Form>
//                   <Button variant='danger' onClick={()=>cart.deleteFromCart(product.productId)} className='mx-2'>Remove From Cart</Button>
//                 </>
//               ) : (
//                 <Button variant="primary" onClick={() => cart.addOneToCart(product.productId)}>
//                   Add to Cart
//                 </Button>
//               )}
//             </Card.Body>
//           </Card>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ProductCards;



// New Test Updates

// import React, { useState, useEffect, useContext } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Card, Button, Form, Row, Col } from 'react-bootstrap'; // Import components from react-bootstrap
// import { CartContext } from './CartContext';
// import axios from '../../../api/axios';
// import Decode from '../../../utils/Decode';
// import { Link } from 'react-router-dom';
// import './ProductCards.css'; // Import the CSS file for styling
// import PlaceOrder from './PlaceOrder';

// const USER_PROFILE_ENDPOINT = './api/users/profile';
// const PRODUCTS_ENDPOINT = './api/products';

// function ProductCards() {
//   const cart = useContext(CartContext);
//   const [auth, setAuth] = useState(false);
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);
//   const [products, setProducts] = useState([]);

//   const authToken = localStorage.getItem('authToken');
//     const role = localStorage.getItem('role');


//   // Method to fetch all products
//   const fetchProducts = () => {
//     axios.get(PRODUCTS_ENDPOINT, {
//       headers: {
//         Authorization: `Bearer ${authToken}` // Add authorization header
//       }
//     })
//       .then(response => {
//         setProducts(response.data.products); // Access the products array from the response
//       })
//       .catch(error => {
//         console.error('Error fetching products:', error);
//       });
//   };

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
//         Authorization: `Bearer ${authToken}` // Add authorization header
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

//     // Fetch products
//     fetchProducts();

//   }, []);

//   // Check if the user is authenticated
//   const isAuthenticated = auth;

//   // Check if the user is authorized to view the product cards
//   const isAuthorized = true; // Replace this with your authorization logic

//   if (!isAuthenticated) {
//     return (
//       <div className="text-center">
//         <p>Please log in to view the product cards.</p>
//         <Link to={"/login"} className="btn btn-primary">Login</Link>
//       </div>
//     );
//   }

//   if (!isAuthorized) {
//     return <p>You are not authorized to view the product cards.</p>;
//   }

//   return (
//     <div>
//       {cart.items.length > 0 && <PlaceOrder />} {/* Render PlaceOrder component if cart is not empty */}
//       <div className="row row-cols-1 row-cols-md-3 g-4">
//         {products.map(product => (
//           <div key={product.productId} className="col">
//             <Card className="product-card">
//               <div className="prod-image-container">
//                 <Card.Img
//                   variant="top"
//                   src={`data:image/jpeg;base64,${product.prodImage}`}
//                   alt={product.name}
//                   className="prod-image"
//                 />
//               </div>
//               <Card.Body>
//                 <Card.Title>{product.name}</Card.Title>
//                 <Card.Text>Category: {product.category}</Card.Text>
//                 <Card.Text>Price: {product.price}</Card.Text>
//                 {cart.getProductQuantity(product.productId) > 0 ? (
//                   <>
//                     {/* Display a message or any other content */}
//                     <Form as={Row}>
//                       <Form.Label column sm="6">In Cart: {cart.getProductQuantity(product.productId)}</Form.Label>
//                       <Col sm="8">
//                         <Button sm="6" onClick={()=>cart.addOneToCart(product.productId)} className='mx-2'>+</Button>
//                         <Button sm="6" onClick={()=>cart.removeOneFromCart(product.productId)} className='mx-2'>-</Button>
//                       </Col>
//                     </Form>
//                     <Button variant='danger' onClick={()=>cart.deleteFromCart(product.productId)} className='mx-2'>Remove From Cart</Button>
//                   </>
//                 ) : (
//                   <Button variant="primary" onClick={() => cart.addOneToCart(product.productId)}>
//                     Add to Cart
//                   </Button>
//                 )}
//               </Card.Body>
//             </Card>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ProductCards;




// Trying New Code

import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Form, Row, Col } from 'react-bootstrap'; // Import components from react-bootstrap
import { CartContext } from './CartContext';
import axios from '../../../api/axios';
import Decode from '../../../utils/Decode';
import { Link } from 'react-router-dom';
import './ProductCards.css'; // Import the CSS file for styling
import PlaceOrder from './PlaceOrder';

const USER_PROFILE_ENDPOINT = './api/users/profile';
const PRODUCTS_ENDPOINT = './api/products';

function ProductCards() {
  const cart = useContext(CartContext);
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

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
        Authorization: `Bearer ${authToken}` // Add authorization header
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

    // Fetch products
    fetchProducts();

  }, []);

  // Method to fetch all products
  const fetchProducts = () => {
    axios.get(PRODUCTS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}` // Add authorization header
      }
    })
      .then(response => {
        setProducts(response.data.products); // Access the products array from the response
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  // Check if the user is authenticated
  const isAuthenticated = auth;

  // Check if the user is authorized to view the product cards
  const isAuthorized = true; // Replace this with your authorization logic

  if (!isAuthenticated) {
    return (
      <div className="text-center">
        <p>Please log in to view the product cards.</p>
        <Link to={"/login"} className="btn btn-primary">Login</Link>
      </div>
    );
  }

  if (!isAuthorized) {
    return <p>You are not authorized to view the product cards.</p>;
  }

  return (
    <div className="container">
      {cart.items.length > 0 && <PlaceOrder />} {/* Render PlaceOrder component if cart is not empty */}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map(product => (
          <div key={product.productId} className="col">
            <Card className="product-card">
              <div className="prod-image-container">
                <Card.Img
                  variant="top"
                  src={`data:image/jpeg;base64,${product.prodImage}`}
                  alt={product.name}
                  className="prod-image"
                />
              </div>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Category: {product.category}</Card.Text>
                <Card.Text>Price: {product.price}</Card.Text>
                {cart.getProductQuantity(product.productId) > 0 ? (
                  <>
                    {/* Display a message or any other content */}
                    <Form as={Row}>
                      <Form.Label column sm="6">In Cart: {cart.getProductQuantity(product.productId)}</Form.Label>
                      <Col sm="6" className="d-flex justify-content-end">
                        <Button variant="outline-secondary" onClick={()=>cart.removeOneFromCart(product.productId)} className='mx-2'>-</Button>
                        <Button variant="outline-secondary" onClick={()=>cart.addOneToCart(product.productId)} className='mx-2'>+</Button>
                      </Col>
                    </Form>
                    <Button variant='danger' onClick={()=>cart.deleteFromCart(product.productId)} className='mt-2'>Remove From Cart</Button>
                  </>
                ) : (
                  <Button variant="primary" onClick={() => cart.addOneToCart(product.productId)} className='mt-2'>
                    Add to Cart
                  </Button>
                )}
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCards;
