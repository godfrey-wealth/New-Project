// import { createContext, useState } from "react";

// import { ProductArray, getProductData } from "./ProductArray";


//  export const CartContext = createContext({

//     items:[],
//     getProductQuantity:()=>{},
//     addOneToCart:()=>{},
//     removeOneFromCart:()=>{},
//     deleteFromCart:()=>{},
//     getTotalCost:()=>{}
//  })

//  export function CartProvider({children}){
//     const [cartProudcts, setCartProducts] = useState([])

//     function getProductQuantity(id)
//     {
//       let productData = ProductArray.find((product)=> product.productId === id);

//       if(productData == undefined)
//       {
//         return undefined
//       }

//       return productData;
//         // const quantity = cartProudcts.find(product => product.productId === id)?.quantity

//         // if(quantity === undefined)
//         // {
//         //     return 0
//         // }

//         // return quantity
//     }

//     function addOneToCart (id)
    
//     {
//         const quantity = getProductQuantity(id);

//         if(quantity === 0){   // product is not in the cart
//            setCartProducts(
//             [
//                 ...cartProudcts,
//                 {
//                     productId: id,
//                     quantity: 1
//                 }
//             ]
//            )        

//         }else{
//             setCartProducts(
//                 cartProudcts.map(product=>product.productId === id
//                 ?{...product, quantity:product.quantity + 1}
//                 :product
//                 )
//             )
//         }
//     }

//     function removeOneFromCart(id){
//         const quantity = getProductQuantity(id);

//         if(quantity == 1){
//             deleteFromCart(id);
//         }else{
//             setCartProducts(
//                 cartProudcts.map(
//                     product => product.productId === id
//                     ?{...product, quantity:product.quantity - 1}
//                     : product
//                 )
//             )
//         }
//     }

//     function deleteFromCart(id){

//         setCartProducts(
//             cartProudcts =>
//             cartProudcts.filter(currentProduct =>{
//                 return currentProduct.productId !=id;
//             })
//         )
//     }

//     function getTotalCost()

//     {

//       let totalCost = 0;

//       cartProudcts.forEach((cartItem) => {
//           const productData = getProductData(cartItem.productId);
//           totalCost += (productData.price * cartItem.quantity);
//       });
  
//       return totalCost;
//         // let totalCost = 0;

//         // cartProudcts.map((cartItem)=>{
//         //     const productData = getProductData(cartItem.id);
//         //     totalCost += (product.price * cartItem.quantity);
//         // });

//         // return totalCost;
//     }

//     const contextValue = {

//         items: cartProudcts,
//         getProductQuantity,
//         addOneToCart,
//         removeOneFromCart,
//         deleteFromCart,
//         getTotalCost

//     }

//     return (
//         <CartContext.Provider value={contextValue}>
//             {children}
//         </CartContext.Provider>
//     )
//  }

//  export default CartProvider;



import { createContext, useState } from "react";
import axios from "../../../api/axios";
import CartProduct from "./CartProduct";

//import React, { useEffect } from 'react';

import { getProductData } from "./ProductArray";


// const GETDATA = 'http://localhost:8080/api/products';

// const getproductData = () => {
//   const [productData, setProductData] = useState(null);
//   const [productId, setProductId] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${GETDATA}/${productId}`);
//         setProductData(response.data);
//       } catch (error) {
//         console.error('Error fetching product data:', error);
//         // Handle error
//       }
//     };

//     if (productId) {
//       fetchData();
//     }
//   }, [productId]);

//   return (
//     <div>
//       <h1>Product Component</h1>
//       {/* Your UI to display productData */}
//     </div>
//   );
// };

//export default getProductData;


export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {}
});

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  function getProductQuantity(id) {
    const quantity = cartProducts.find(product => product.productId === id)?.quantity;

    return quantity || 0;
  }

  function addOneToCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 0) {
      setCartProducts([
        ...cartProducts,
        {
          productId: id,
          quantity: 1
        }
      ]);
    } else {
      setCartProducts(
        cartProducts.map(product =>
          product.productId === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    }
  }

  function removeOneFromCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      setCartProducts(
        cartProducts.map(product =>
          product.productId === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  }

  function deleteFromCart(id) {
    setCartProducts(cartProducts =>
      cartProducts.filter(currentProduct => currentProduct.productId !== id)
    );
  }
  


// Function to fetch product prices from an API using Axios
async function fetchProductPrice(productId) {
  try {
    const response = await axios.get(`./api/products/${productId}`);
    return response.data.price; // Assuming the response contains the price data
    return response.data.name;
    return response.data.prodImage
  } catch (error) {
    console.error("Error fetching product price:", error.message);
    return null;
  }
}

// Function to populate cartProducts array with product objects and their prices
async function populateCartProducts() {
  for (const cartItem of cartProducts) {
    const productId = cartItem.productId; // Assuming productId is used to fetch the product price
    const price = await fetchProductPrice(productId);
    const name = await fetchProductPrice(productId);
    const prodImage = await fetchProductPrice(productId);
    if (price !== null) {
      cartItem.price = price;
      
    }

    // else if(name !== null){
    //   cartItem.name = name;
    // }

    // else if(prodImage !== null)
    // {
    //   cartItem.prodImage = prodImage;
    // }
    
     else {
      console.error("Failed to fetch price for product:", productId);
    }
  }
}

// Function to calculate the total cost
function getTotalCost() {
  let totalCost = 0;

  cartProducts.forEach(cartItem => {
    const price = parseFloat(cartItem.price) || 0;
    //const name = Text(cartItem.name) || 0;
    //const prodImage =(cartItem.prodImage) || 0;
     // Accessing product's price
    const quantity = parseInt(cartItem.quantity) || 0;

    if (!isNaN(price) && !isNaN(quantity)) {
      totalCost += price * quantity;
    } else {
      console.error("Invalid price or quantity:", cartItem);
    }
  });
  	return totalCost.toFixed(2);
  //return "Total: €" + totalCost.toFixed(2); // Return the updated totalAmount with 2 decimal places
}

// Call the function to populate cartProducts array with product objects and their prices
populateCartProducts()
  .then(() => {
    // Once cartProducts is populated, you can calculate the total cost
    console.log(getTotalCost());
  })
  .catch(error => {
    console.error("Error populating cartProducts:", error.message);
  });

  

  
   // Initialize totalAmount to 0
  // function getTotalCost() {
    
 
  
  
    // function getTotalCost() {

    //   let totalCost = 0;

    //   cartProducts.forEach(cartItem => {
    //     const price = cartItem.price || 0;
    //     const quantity = cartItem.quantity || 0;
    
    //     totalCost += price * quantity;
    //   });
    
    //   return totalCost.toFixed(2); // Return the total cost with 2 decimal places
    // }

    
  
    
    // function updateTotalAmount(orders) {
    //   orders.forEach(order => {
    //     const totalCost = getTotalCost(order.cartProducts);
    //     totalAmount += parseFloat(totalCost); // Add the totalCost to totalAmount
    //   });
    // }
    
    // // Example usage:
    // const orders = [
    //   {
    //     orderId: 1,
    //     cartProducts: [
    //       { price: 10, quantity: 2 },
    //       { price: 20, quantity: 1 }
    //       // More cart items for order 1...
    //     ]
    //   },
    //   {
    //     orderId: 2,
    //     cartProducts: [
    //       { price: 15, quantity: 3 },
    //       { price: 25, quantity: 2 }
    //       // More cart items for order 2...
    //     ]
    //   },
    //   // More orders...
    // ];
    
    // updateTotalAmount(orders);
    
    // console.log('Updated Total Amount:', totalAmount); // TotalAmount will be updated
     
       let totalCost = 0;
    //   //let totalAmount = 0; // Initialize totalAmount to 0
    
      // cartProducts.forEach(cartItem => {
      //   const price = cartItem.price || 0;
      //   const quantity = cartItem.quantity || 0;
    
      //   totalCost += price * quantity;
      // });
    
      // // Add totalCost to totalAmount
      // totalAmount += totalCost;
    
    //   return totalCost.toFixed(2); // Return the total cost with 2 decimal places
    // }
    
    // // // Example usage:
    // // const cartProducts = [
    // //   { price: 10, quantity: 2 },
    // //   { price: 20, quantity: 1 },
    // //   // More cart items...
    // // ];
    
    // const total = getTotalCost(cartProducts);
    // console.log('Total Cost:', total);
    
    // console.log('Updated Total Amount:', totalAmount); // TotalAmount will be updated
   
    //  function getTotalCost() {
    //   return cartProducts.reduce((total, product) => {
    //     const price = product.price || 0;
    //     const quantity = product.quantity || 0;
    //     return total + (price * quantity);
    //   }, 0).toFixed(2);
    // }
    //  let totalCost = 0;

    // cartProducts.forEach(cartItem => {
    //   // Assuming each cart item has a 'price' property
    //   const price = cartItem.price || 0; // If price is not available, default to 0
    //   const quantity = cartItem.quantity || 0; // If quantity is not available, default to 0
  
    //   totalCost += price * quantity;
    // });
  
    // return totalCost;

    // let totalCost = 0;

  //       cartProducts.map((cartItem)=>{
  //           const productData = getProductQuantity(cartItem.id);
  //           totalCost += (productData.price * cartItem.quantity);
  //       });

  //       return totalCost;

  // }

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;



//New code

// import React, { createContext, useState } from "react";
// import getProductData from "./getProductData";

// export const CartContext = createContext({
//   items: [],
//   getProductQuantity: () => {},
//   addOneToCart: () => {},
//   removeOneFromCart: () => {},
//   deleteFromCart: () => {},
//   getTotalCost: () => {}
// });

// export function CartProvider({ children }) {
//   const [cartProducts, setCartProducts] = useState([]);

//   function getProductQuantity(id) {
//     const quantity = cartProducts.find(product => product.productId === id)?.quantity;
//     return quantity || 0;
//   }

//   function addOneToCart(id) {
//     const quantity = getProductQuantity(id);

//     if (quantity === 0) {
//       setCartProducts([
//         ...cartProducts,
//         {
//           productId: id,
//           quantity: 1
//         }
//       ]);
//     } else {
//       setCartProducts(
//         cartProducts.map(product =>
//           product.productId === id
//             ? { ...product, quantity: product.quantity + 1 }
//             : product
//         )
//       );
//     }
//   }

//   function removeOneFromCart(id) {
//     const quantity = getProductQuantity(id);

//     if (quantity === 1) {
//       deleteFromCart(id);
//     } else {
//       setCartProducts(
//         cartProducts.map(product =>
//           product.productId === id
//             ? { ...product, quantity: product.quantity - 1 }
//             : product
//         )
//       );
//     }
//   }

//   function deleteFromCart(id) {
//     setCartProducts(cartProducts =>
//       cartProducts.filter(currentProduct => currentProduct.productId !== id)
//     );
//   }

//   function getTotalCost() {
//     let totalCost = 0;

//     cartProducts.forEach(cartItem => {
//       const product = getProductData(cartItem.productId); // Assuming getProductData is a function to retrieve product data
//       const price = product ? product.price : 0;
//       totalCost += price * cartItem.quantity;
//     });
  
//     return totalCost;
//   }

//   const contextValue = {
//     items: cartProducts,
//     getProductQuantity,
//     addOneToCart,
//     removeOneFromCart,
//     deleteFromCart,
//     getTotalCost
//   };

//   return (
//     <CartContext.Provider value={contextValue}>
//       {children}
//     </CartContext.Provider>
//   );
// }
