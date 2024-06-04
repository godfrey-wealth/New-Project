// // // src/components/ShoppingCart.js
// // import React from 'react';
// // import { Typography } from '@mui/material';

// // const ShoppingCart = () => {
// //   return (
// //     <div className="container">
// //       <Typography variant="h2" gutterBottom>
// //         Shopping Cart
// //       </Typography>
// //       <Typography variant="body1">
// //         Your shopping cart is currently empty.
// //       </Typography>
// //     </div>
// //   );
// // };

// // export default ShoppingCart;


// // src/layouts/ShoppingCart.js
import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import ProductCard from '../components/ProductCard';

const ShoppingCart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from backend API
    fetch('http://localhost:8080/api/products')
      .then(response => response.json())
      .then(data => setProducts(data.products))
      .catch(error => console.error('Error fetching products:', error));
      
  }, []);

  return (
    <Grid container spacing={2}>
      {products.map(product => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.productId}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ShoppingCart;

