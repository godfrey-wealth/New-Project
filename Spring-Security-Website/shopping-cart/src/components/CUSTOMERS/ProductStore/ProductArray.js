
// export default ProductArray;



// JUST TESTING

import React, { useEffect, useState } from 'react';
import axios from '../../../api/axios';
import Decode from '../../../utils/Decode';

const ORDERS_ENDPOINT = './api/orders';
const USER_PROFILE_ENDPOINT = './api/users/profile';
const PRODUCTS_ENDPOINT = './api/products';

const ProductArray = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [totalSalesRevenue, setTotalSalesRevenue] = useState(0);
  const [totalProfits, setTotalProfits] = useState(0);
  const [totalProductsSold, setTotalProductsSold] = useState(0);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          throw new Error('User authentication failed. Please log in.');
        }

        const decodedToken = Decode(authToken);
        if (!decodedToken || !decodedToken.userId) {
          throw new Error('Invalid authentication token.');
        }

        

        const ordersResponse = await axios.get(ORDERS_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });

        const ordersData = ordersResponse.data;
        if (!ordersData || !ordersData.orders || ordersData.orders.length === 0) {
          throw new Error('No orders found.');
        }

        setOrdersData(ordersData.orders);

        const productsResponse = await axios.get(PRODUCTS_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });

        const productsData = productsResponse.data;
        if (!productsData || !productsData.products || productsData.products.length === 0) {
          throw new Error('No products found.');
        }

        setProducts(productsData.products);

        const totalRevenue = ordersData.orders.reduce((acc, order) => acc + order.totalAmount, 0);
        setTotalSalesRevenue(totalRevenue);

        let totalCost = 0;
        ordersData.orders.forEach(order => {
          order.cartItems.forEach(item => {
            const product = products.find(prod => prod.productId === item.productId);
            if (product) {
              totalCost += product.costPrice * item.quantity;
            }
          });
        });

        const totalProfits = totalRevenue - totalCost;
        setTotalProfits(totalProfits);

        const totalProductsSold = ordersData.orders.reduce((acc, order) => acc + order.cartItems.length, 0);
        setTotalProductsSold(totalProductsSold);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      {error && <div className="alert alert-danger">{error}</div>}
      {!error && ordersData.length === 0 && <div className="alert alert-warning">No orders found.</div>}
      {!error && ordersData.length > 0 && (
        <div>
          <h3>Total Sales Revenue: €{totalSalesRevenue.toFixed(2)}</h3>
          <h3>Total Profits: €{totalProfits.toFixed(2)}</h3>
          <h3>Total Products Sold: {totalProductsSold}</h3>
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Order ID</th>
                <th>Description</th>
                <th>TotalAmount</th>
                <th>User ID</th>
                <th>FirsName</th>
                <th>User Name</th>
                <th>Cart Items</th>
              </tr>
            </thead>
            <tbody>
              {ordersData.map((order, index) => (
                <tr key={index}>
                  <td>{order.orderId}</td>
                  <td>{order.orderDescription}</td>
                  <td>{order.totalAmount}</td>
                  <td>{order.user.id}</td>
                  <td>{order.user.firstname}</td>
                  <td>{order.user.username}</td>
                  <td>
                    <table className="table table-sm">
                      <thead className="thead-light">
                        <tr>
                          <th>Product ID</th>
                          <th>Product Name</th>
                          <th>Quantity</th>
                          <th>Total Amount</th>
                          <th>Image</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.cartItems.map((item, idx) => (
                          <tr key={idx}>
                            <td>{item.productId}</td>
                            <td>{item.productName}</td>
                            <td>{item.quantity}</td>
                            <td>€{parseFloat(item.amount).toFixed(2)}</td>
                            <td>
                              <img
                                src={`data:image/jpeg;base64,${item.productImages}`}
                                alt={item.productName}
                                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductArray;
