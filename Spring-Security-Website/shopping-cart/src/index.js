import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles.css';
//import './MainLayout.css';
import App from './App';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
   
    <App />
   
    {/* </BrowserRouter> */}
   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
// import './styles.css';
// import App from './App';
// import { AuthProvider } from './context/AuthProvider'; // Import AuthProvider

// ReactDOM.render(
//   <React.StrictMode>
//     <Router>
//       <AuthProvider> {/* Integrate AuthProvider here */}
//         <App />
//       </AuthProvider>
//     </Router>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// index.js or App.js

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
// import App from './App'; // Your main application component

// ReactDOM.render(
//   <Router>
//     <App />
//   </Router>,
//   document.getElementById('root')
// );
