// src/layouts/MainLayout.js
import React from 'react';
import Navigation from '../components/Navigation';
import styled from 'styled-components';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex-grow: 1;
  padding: 20px;
`;

const Footer = styled.footer`
  background-color: #673ab7;
  color: #fff;
  padding: 20px 0;
  text-align: center;
`;

const MainLayout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Navigation />
      <MainContent>{children}</MainContent>
      <Footer>
        <p>&copy; 2024 My Shopping Cart</p>
      </Footer>
    </LayoutWrapper>
  );
};

export default MainLayout;
