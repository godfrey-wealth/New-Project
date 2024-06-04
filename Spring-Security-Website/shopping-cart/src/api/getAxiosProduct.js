import { useState, useEffect } from "react";


import axios from "../../api/axios";

import { RetrieveToken } from "../../hooks/AuthenticationHolder";

export function GETPRODUCTBYID(id){
  const [product, setProduct] = useState({
    name: "",
    availablequantity: "",
    price: "",
    category: "",
  })

  

  useEffect(()=>{
    LoadProduct();
  },[]);

  const LoadProduct= async()=>{
    const result = await axios.get(`http://localhost:8080/api/products/${id}`,
    {
    headers: {
      'Authorization': `Bearer ${ RetrieveToken() }`
    }
  });

    setProduct(result.data.product);

    console.log(result.data.product);
  }
}


export function GETALLPRODUCTS(){
  const [products, setProducts] = useState([]);
   

  

  useEffect(()=>{
    LoadProducts();
  },[]);

  const LoadProducts= async()=>{
    const result = await axios.get(`http://localhost:8080/api/products`,
    {
    headers: {
      'Authorization': `Bearer ${ RetrieveToken() }`
    }
  });

}
}