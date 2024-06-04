import axios from '../../../api/axios';

const GETDATA = './api/products/';

const getProductData = async (id) => {
  try {
    const response = await axios.get(`${GETDATA}${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product data:', error);
    return undefined;
  }
};

export default getProductData;
  




