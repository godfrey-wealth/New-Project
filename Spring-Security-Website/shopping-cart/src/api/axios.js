// import { axiosPrivate } from '../../api/axios';
import { useState } from 'react';
import axios from 'axios';
const BASE_URL = 'http://localhost:8080';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});


export function GetALLProducts(){
   // const GETPRODUCTS_URL = "/api/products";

    return BASE_URL = "/api/products";
}
export function RetrieveToken()
{
    return localStorage.getItem('jwt_token');
}

export function GetProductByID(id){

    return BASE_URL =`/api/products/${id}`;
}

export function getdetails(){
    
}