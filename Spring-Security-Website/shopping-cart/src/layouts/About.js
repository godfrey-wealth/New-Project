// src/components/About.js
import React from 'react';
import { Typography } from '@mui/material';

const About = () => {
  return (
    <div className="container">
      <Typography variant="h2" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1">
      Online shopping cart applications are e-commerce platforms that allow customers to browse, select, and purchase products from various shops or retailers through a centralized digital interface. These applications provide a convenient and integrated shopping experience for customers,
       enabling them to complete the entire purchasing process without having to visit physical stores.
      </Typography>
    </div>
  );
};

export default About;
