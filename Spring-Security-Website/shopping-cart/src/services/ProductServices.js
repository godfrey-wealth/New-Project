// src/services/ProductService.js
class ProductService {
    static async fetchProducts() {
      try {
        const response = await fetch('http://localhost:8080/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        return data.products;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error; // Rethrow the error for handling in the component
      }
    }
  }
  
  export default ProductService;
  