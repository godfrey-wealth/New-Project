// import Button from "react-bootstrap/Button";

// import { CartContext } from "./CartContext";

// import { useContext } from "react";

// import {getProductData} from "./ProductArray";


// function CartProduct(props)
// {
//     const cart = useContext(CartContext);

//     const id = props.productId

//     const quantity = props.quantity

//     const productData = props.getProductData(id);

//     return(

//         <div>
//             <h3>{productData.name}</h3>
//             <p>{quantity} Total</p>
//             <p>
//                 €{(quantity * productData.price).toFixed(2)}
//             </p>
//             <Button size="sm" onClick={()=>cart.deleteFromCart(id)}>Remove</Button>
//             <hr></hr>
//         </div>
//     )


// }

// export default CartProduct;



// New Updates

// import React, { useContext, useEffect } from "react";
// import { Button } from "react-bootstrap";
// import { CartContext } from "./CartContext";
// import axios from '../../../api/axios'; // Import axios instance

// const GET_DATA_URL = './api/products';
// function CartProduct(props) {
//   const cart = useContext(CartContext);

//   const id = props.id;
//   const quantity = props.quantity;
//   const name = props.name;
//   const price = props.price;
//   const getProductData = props.getProductData;

//   const handleRemoveFromCart = () => {
//     cart.deleteFromCart(id);
//   };

//   // Fetch product data by ID
//   const fetchProductData = async () => {
//     try {
//       const response = await axios.get(`${GET_DATA_URL}/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching product data:', error);
//       return null;
//     }
//   };

//   // Load product data when component mounts
//   useEffect(() => {
//     fetchProductData()
//       .then(productData => {
//         if (productData) {
//           // Product data fetched successfully, handle it
//           console.log('Product data:', productData);
//         } else {
//           // Error occurred or product not found
//           console.log('Product not found or error fetching data.');
//         }
//       });
//   }, []);

//   return (
//     <div>
//       {/* Render product details here */}
//       <h3>Product Name</h3>
//       <p>{name}</p>
//       <p>{quantity} Total</p>
//         <p>Price: {price}</p>
//       <Button size="sm" onClick={handleRemoveFromCart}>
//         Remove
//       </Button>
//       <hr />
//     </div>
//   );
// }

// export default CartProduct;




// New Code

// import React, { useContext, useEffect, useState } from "react";
// import { Button } from "react-bootstrap";
// import { CartContext } from "./CartContext";
// import axios from '../../../api/axios'; // Import axios instance

// const GET_DATA_URL = './api/products';

// function CartProduct(props) {
//   const cart = useContext(CartContext);
//   const [imageData, setImageData] = useState('');

//   const { id, quantity, name, price } = props;

//   const handleRemoveFromCart = () => {
//     cart.deleteFromCart(id);
//   };

//   // Fetch product data by ID
//   const fetchProductData = async () => {
//     try {
//       const response = await axios.get(`${GET_DATA_URL}/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
//       if (response.data.prodImage) {
//         setImageData(response.data.prodImage);
//       }
//     } catch (error) {
//       console.error('Error fetching product data:', error);
//     }
//   };

//   // Load product data when component mounts
//   useEffect(() => {
//     fetchProductData();
//   }, []);

//   return (
//     <div>
//       {/* Render product details here */}
//       <h3>Product Name</h3>
//       <p>{name}</p>
//       <p>{quantity} Total</p>
//       <p>Price: {price}</p>
//       {imageData && <img src={`data:image/jpeg;base64,${imageData}`} alt="Product" style={{ maxWidth: '100px' }} />}
//       <p>
//           €{(quantity * productData.price).toFixed(2)}     
//         </p>
//       <Button size="sm" onClick={handleRemoveFromCart}>
//         Remove
//       </Button>
//       <hr></hr>
//     </div>
//   );
// }

// export default CartProduct;




// NEW CHANGES(Godfrey)

// import React, { useContext, useEffect, useState } from "react";
// import { Button } from "react-bootstrap";
// import { CartContext } from "./CartContext";
// import axios from '../../../api/axios'; // Import axios instance

// const GET_DATA_URL = './api/products';

// function CartProduct(props) {
//   const cart = useContext(CartContext);
//   const [imageData, setImageData] = useState('');
//   const [price, setPrice] = useState(0);
//   const [productName, setProductName] = useState(''); // Initialize productName state

//   const { id, quantity, name} = props; // Remove 'name' from destructuring
//   const productCounts = cart.items.reduce((sum, product) => sum + product.quantity, 0);

//   const handleRemoveFromCart = () => {
//     cart.deleteFromCart(id);
//   };

//   // Fetch product data by ID
//   const fetchProductData = async () => {
//     try {
//       const response = await axios.get(`${GET_DATA_URL}/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
//       if (response.data.prodImage) {
//         setImageData(response.data.prodImage);
//       }
//       if (response.data.price) {
//         setPrice(response.data.price);
//       }
//       if (response.data.name) { // Set the productName state
//         setProductName(response.data.name);
//       }
//     } catch (error) {
//       console.error('Error fetching product data:', error);
//     }
//   };

//   // Load product data when component mounts
//   useEffect(() => {
//     fetchProductData();
//   }, []);

//   const totalPrice = (quantity * price).toFixed(2);

//   return (
//     <div>
//       {/* Render product details here */}
//       <h3>Product Name</h3>
//       <p>{productName}</p> {/* Display productName */}
//       <p>{quantity} Total</p>
//       <p>Price: {price}</p>
//       {imageData && <img src={`data:image/jpeg;base64,${imageData}`} alt="Product" style={{ maxWidth: '100px' }} />}
//       <p>Total Price: €{totalPrice}</p>
//       {/* <p>TotalCost:{cart.getTotalCost().toFixed(2)}</p> */}
//       <Button size="sm" onClick={handleRemoveFromCart}>
//         Remove
//       </Button>
//       <hr />
//     </div>
//   );
// }

// export default CartProduct;



// NEWW

// import React, { useContext, useEffect, useState } from "react";
// import { Button } from "react-bootstrap";
// import { CartContext } from "./CartContext";
// import axios from '../../../api/axios'; // Import axios instance

// const GET_DATA_URL = './api/products';

// function CartProduct(props) {
//   const cart = useContext(CartContext);
//   const [imageData, setImageData] = useState('');
//   const [price, setPrice] = useState(0);
//   const [productName, setProductName] = useState('');
//   const [error, setError] = useState('');

//   const { id, quantity, name, getTotalCost } = props;

//   const handleRemoveFromCart = () => {
//     cart.deleteFromCart(id);
//   };

//   // Fetch product data by ID
//   const fetchProductData = async () => {
//     try {
//       const response = await axios.get(`${GET_DATA_URL}/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
//       console.log('Product Data:', response.data); // Log product data to check the response structure
//       if (response.data.prodImage) {
//         setImageData(response.data.prodImage);
//       }
//       if (response.data.price) {
//         console.log('Price:', response.data.price); // Log the fetched price
//         setPrice(response.data.price);
//       }
//       if (response.data.name) {
//         setProductName(response.data.name);
//       }
//     } catch (error) {
//       console.error('Error fetching product data:', error);
//       setError('Product data not found or error fetching data.');
//     }
//   };

//   // Load product data when component mounts
//   useEffect(() => {
//     fetchProductData();
//   }, []);

//   const totalPrice = (!isNaN(price) && !isNaN(quantity)) ? (quantity * price).toFixed(2) : 0; // Check if price and quantity are valid numbers

//   return (
//     <div>
//       <h3>Product Name</h3>
//       {error ? <p>{error}</p> : (
//         <>
//           <p>{productName}</p>
//           <p>{quantity} Total</p>
//           <p>Price: {price}</p>
//           {imageData && <img src={`data:image/jpeg;base64,${imageData}`} alt="Product" style={{ maxWidth: '100px' }} />}
//           <p>Total Price: €{totalPrice}</p>
//           <Button size="sm" onClick={handleRemoveFromCart}>
//             Remove
//           </Button>
//         </>
//       )}
//       <hr />
//     </div>
//   );
// }

// export default CartProduct;






// Try this Code

// import React, { useContext, useEffect, useState } from "react";
// import { Button } from "react-bootstrap";
// import { CartContext } from "./CartContext";
// import axios from '../../../api/axios'; // Import axios instance

// const GET_DATA_URL = './api/products';

// function CartProduct(props) {
//   const { id, quantity } = props;
//   const [imageData, setImageData] = useState('');
//   const [price, setPrice] = useState(0);
//   const [productName, setProductName] = useState('');
//   const [totalCost, setTotalCost] = useState(0);

//   const cart = useContext(CartContext);

//   const handleRemoveFromCart = () => {
//     cart.deleteFromCart(id);
//   };

//   const fetchProductData = async () => {
//     try {
//       const response = await axios.get(`${GET_DATA_URL}/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
//       if (response.data.prodImage) {
//         setImageData(response.data.prodImage);
//       }
//       if (response.data.price) {
//         setPrice(response.data.price);
//       }
//       if (response.data.name) {
//         setProductName(response.data.name);
//       }
//     } catch (error) {
//       console.error('Error fetching product data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchProductData();
//   }, []);

//   useEffect(() => {
//     const newTotalCost = quantity * price;
//     setTotalCost(newTotalCost);
//   }, [quantity, price]);

//   return (
//     <div>
//       <h3>Product Name</h3>
//       <p>{productName}</p>
//       <p>{quantity} Total</p>
//       <p>Price: {price}</p>
//       {imageData && <img src={`data:image/jpeg;base64,${imageData}`} alt="Product" style={{ maxWidth: '100px' }} />}
//       <p>Total Price: €{totalCost.toFixed(2)}</p>
//       <Button size="sm" onClick={handleRemoveFromCart}>
//         Remove
//       </Button>
//       <hr />
//     </div>
//   );
// }

// export default CartProduct;



// Try New Code

import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { CartContext } from "./CartContext";
import axios from '../../../api/axios'; // Import axios instance

const GET_DATA_URL = './api/products';

function CartProduct(props) {
  const { id, quantity } = props;
  const [imageData, setImageData] = useState('');
  const [price, setPrice] = useState(0);
  const [productName, setProductName] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  const cart = useContext(CartContext);

  const handleRemoveFromCart = () => {
    cart.deleteFromCart(id);
  };

  const fetchProductData = async () => {
    try {
      const response = await axios.get(`${GET_DATA_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      if (response.data.prodImage) {
        setImageData(response.data.prodImage);
      }
      if (response.data.price) {
        setPrice(response.data.price);
      }
      if (response.data.name) {
        setProductName(response.data.name);
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    const newTotalCost = quantity * price;
    setTotalCost(newTotalCost);
  }, [quantity, price]);

  return (
    <div>
      <h3>Product Name</h3>
      <p>{productName}</p>
      <p>{quantity} Total</p>
      {/* <p>Price: {price}</p> */}
      {imageData && <img src={`data:image/jpeg;base64,${imageData}`} alt="Product" style={{ maxWidth: '100px' }} />}
      <p>Total Price: €{totalCost.toFixed(2)}</p>
      <Button size="sm" onClick={handleRemoveFromCart}>
        Remove
      </Button>
      <hr />
    </div>
  );
}

export default CartProduct;




