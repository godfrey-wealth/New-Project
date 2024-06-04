import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // Construct the image source with the Base64 encoded image data
  const imageSrc = `data:image/jpeg;base64,${product.prodImage}`;

  return (
     <Card style={{ maxWidth: 300 }}>
   
      {/* Render the image */}
      <img src={imageSrc} alt={product.name} style={{ width: '100%', height: 'auto', maxHeight: 200 }} />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body1">
          Price: ${product.price}
        </Typography>
        <Typography variant="body2">
          Quantity: {product.availablequantity}
        </Typography>
        <Typography variant="body2">
          Category: {product.category}
        </Typography>
        {/* Add to Cart button */}
        <Button component={Link} to="/login" variant="contained" color="primary">Add to Cart</Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
