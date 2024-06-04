//import jwtDecode from "jwt-decode";
import { faLeftRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import RequireAuth from "../components/RequireAuth";


export function SaveToken(accessToken)
{
    localStorage.setItem('jwt_token', accessToken);    
}
export function RetrieveToken()
{
    return localStorage.getItem('jwt_token');
}
export function DeleteToken()
{
    localStorage.removeItem('jwt_token');
    alert('Logout success!')
    window.location.href = '/login';
}

export function getRoles(accessToken)
{
    alert(accessToken);
   
    
    localStorage.setItem('jwt_token', accessToken);
   
}


export function parseJwt(token) {

    var base64Url = token.split('.')[1];

    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {

        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);

    }).join(''));



    return JSON.parse(jsonPayload);

}