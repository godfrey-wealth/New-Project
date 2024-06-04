// import React, { useContext, useState } from "react";
// import { Button, Modal, Navbar } from "react-bootstrap"; // Import components from react-bootstrap
// import { CartContext } from "./CartContext";
// import CartProduct from "./CartProduct";

// function PlaceOrder() {
//   const cart = useContext(CartContext);
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true); // Fix typo: setShow(true) instead of setShow(false)

//   const productCounts = cart.items.reduce((sum, product) => sum + product.quantity, 0);

//   const chekout = () => {
//     // Checkout logic
//   };

//   return (
//     <div>
//       <Navbar expand="sm">
//         <Navbar.Brand href="/order">E-Commerce Store</Navbar.Brand>
//         <Navbar.Toggle />
//         <Navbar.Collapse className="justify-content-end">
//           <Button onClick={handleShow}>cart({productCounts} Items)</Button>
//         </Navbar.Collapse>
//       </Navbar>
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Shopping Cart</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           {productCounts > 0 ? (
//             <>
//               <p>Items in your Cart</p>
//               {cart.items.map((currentProduct, idx) => (
//                 <CartProduct key={idx} id={currentProduct.productId} name={currentProduct.name} quantity={currentProduct.quantity} price={currentProduct.price} prodImage={currentProduct.prodImage}></CartProduct>
//               ))}
//               <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>

//               <Button variant="success" onClick={chekout}>
//                 Purchase Items
//               </Button>
//             </>
//           ) : (
//             <h1>There are No Items in Your Cart</h1>
//           )}
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default PlaceOrder;


// import React, { useContext, useState } from "react";
// import { Button, Modal, Navbar } from "react-bootstrap";
// import { CartContext } from "./CartContext";
// import CartProduct from "./CartProduct";

// function PlaceOrder() {
//   const cart = useContext(CartContext);
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const productCounts = cart.items.reduce((sum, product) => sum + product.quantity, 0);

//   const chekout = () => {
//     // Logic for checkout
//   };

//   return (
//     <div>
//       <Navbar expand="sm">
//         <Navbar.Brand href="/order">E-Commerce Store</Navbar.Brand>
//         <Navbar.Toggle />
//         <Navbar.Collapse className="justify-content-end">
//           <Button onClick={handleShow}>Cart ({productCounts} Items)</Button>
//         </Navbar.Collapse>
//       </Navbar>
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Shopping Cart</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           {productCounts > 0 ? (
//             <>
//               <p>Items in your Cart</p>
//               {cart.items.map((currentProduct, idx) => (
//                 <CartProduct
//                   key={idx}
//                   id={currentProduct.productId}
//                   name={currentProduct.name}
//                   quantity={currentProduct.quantity}
//                   price={currentProduct.price}
//                   prodImage={currentProduct.prodImage}
//                 />
//               ))}
//               <h1>Total: €{cart.getTotalCost().toFixed(2)}</h1> {/* Display total cost */}
//               <Button variant="success" onClick={chekout}>
//                 Purchase Items
//               </Button>
//             </>
//           ) : (
//             <h1>There are No Items in Your Cart</h1>
//           )}
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default PlaceOrder;



// PLace New Code

// import React, { useContext, useState } from "react";
// import { Button, Modal, Navbar } from "react-bootstrap";
// import { CartContext } from "./CartContext";
// import CartProduct from "./CartProduct";

// function PlaceOrder() {
//   const cart = useContext(CartContext);
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const productCounts = cart.items.reduce((sum, product) => sum + product.quantity, 0);

//   const checkout = () => {
//     // Logic for checkout
//   };

//   return (
//     <div>
//       <Navbar expand="sm">
//         <Navbar.Brand href="/order">E-Commerce Store</Navbar.Brand>
//         <Navbar.Toggle />
//         <Navbar.Collapse className="justify-content-end">
//           <Button onClick={handleShow}>Cart ({productCounts} Items)</Button>
//         </Navbar.Collapse>
//       </Navbar>
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Shopping Cart</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           {productCounts > 0 ? (
//             <>
//               <p>Items in your Cart</p>
//               {cart.items.map((currentProduct, idx) => (
//                 <CartProduct
//                   key={idx}
//                   id={currentProduct.productId}
//                   name={currentProduct.name}
//                   quantity={currentProduct.quantity}
//                   price={currentProduct.price}
//                   prodImage={currentProduct.prodImage}
//                 />
//               ))}
//               <h1>Total: €{cart.getTotalCost().toFixed(2)}</h1> {/* Display total cost */}
//               <Button variant="success" onClick={checkout}>
//                 Purchase Items
//               </Button>
//             </>
//           ) : (
//             <h1>There are No Items in Your Cart</h1>
//           )}
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default PlaceOrder;


// import React, { useContext, useState } from "react";
// import { Button, Modal, Navbar } from "react-bootstrap";
// import { CartContext } from "./CartContext";
// import CartProduct from "./CartProduct";

// function PlaceOrder(props) {
//   const cart = useContext(CartContext);
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const productCounts = cart.items.reduce((sum, product) => sum + product.quantity, 0);

//   const checkout = () => {
//     // Logic for checkout
//   };

//   return (
//     <div>
//       <Navbar expand="sm">
//         <Navbar.Brand href="/order">E-Commerce Store</Navbar.Brand>
//         <Navbar.Toggle />
//         <Navbar.Collapse className="justify-content-end">
//           <Button onClick={handleShow}>Cart ({productCounts} Items)</Button>
//         </Navbar.Collapse>
//       </Navbar>
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Shopping Cart</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           {productCounts > 0 ? (
//             <>
//               <p>Items in your Cart</p>
//               {cart.items.map((currentProduct, idx) => (
//                 <CartProduct
//                   key={idx}
//                   id={currentProduct.productId}
//                    name={currentProduct.name}
//                   quantity={currentProduct.quantity}
//                 //   price={currentProduct.price}
//                   prodImage={currentProduct.prodImage}
//                   //getTotalCost={cart.getTotalCost}
//                 />
//               ))}
//               <h1>Total: €{parseFloat(cart.getTotalCost()).toFixed(2)}</h1>
//               <Button variant="success" onClick={checkout}>
//                 Purchase Items
//               </Button>
//             </>
//           ) : (
//             <h1>There are No Items in Your Cart</h1>
//           )}
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default PlaceOrder;


// try this (Godfrey)

// import React, { useContext, useState } from "react";
// import { Button, Modal, Navbar } from "react-bootstrap";
// import { CartContext } from "./CartContext";
// import CartProduct from "./CartProduct";

// function PlaceOrder(props) {
//   const cart = useContext(CartContext);
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const productCounts = cart.items.reduce((sum, product) => sum + product.quantity, 0);

//   // Calculate total cost of all items in the cart
//   const totalCartCost = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

//   const checkout = () => {
//     // Logic for checkout
//   };

//   return (
//     <div>
//       <Navbar expand="sm">
//         <Navbar.Brand href="/order">E-Commerce Store</Navbar.Brand>
//         <Navbar.Toggle />
//         <Navbar.Collapse className="justify-content-end">
//           <Button onClick={handleShow}>Cart ({productCounts} Items)</Button>
//         </Navbar.Collapse>
//       </Navbar>
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Shopping Cart</Modal.Title>
//         </Modal.Header>
        
//         <Modal.Body>
//           {productCounts > 0 ? (
//             <>
//               <p>Items in your Cart</p>
//               {cart.items.map((currentProduct, idx) => (
//                 <CartProduct
//                   key={idx}
//                   id={currentProduct.productId}
//                   name={currentProduct.name}
//                   quantity={currentProduct.quantity}
//                   price={currentProduct.price}
//                   prodImage={currentProduct.prodImage}
//                  // getTotalCost={currentProduct.getTotalCost}
//                 />
//               ))}
//               {/* <h1>Total: €{totalCartCost.toFixed(2)}</h1> */}
//               <h1>Total: €{parseFloat(cart.getTotalCost()).toFixed(2)}</h1>
//               <Button variant="success" onClick={checkout}>
//                 Purchase Items
//               </Button>
//             </>
//           ) : (
//             <h1>There are No Items in Your Cart</h1>
//           )}
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default PlaceOrder;



// Place oRDER CODE
import React, { useContext, useState, useEffect } from "react";
import { Button, Modal, Navbar, FormControl } from "react-bootstrap";
import { CartContext } from "./CartContext";
import CartProduct from "./CartProduct";
import axios from "../../../api/axios"; // Import axios
import { useNavigate } from 'react-router-dom';

const PLACEORDER_URL = "./api/orders";
const GETUSERPROFILE_URL = "./api/users/profile";

function PlaceOrder(props) {
  const cart = useContext(CartContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const productCounts = cart.items.reduce((sum, product) => sum + product.quantity, 0);

  const [user, setUser] = useState({
    id: "",
    firstname: "",
    lastname: "",
  });

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setAuth(true);
      LoadUsers(authToken);
    }
  }, []);

  const LoadUsers = async (authToken) => {
    try {
      const result = await axios.get(GETUSERPROFILE_URL, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      setUser(result.data);
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const orderDescription = e.target.orderDescription.value;
    const orderId = e.target.orderId.value;

    const cartItems = cart.items.map((item, index) => ({
      productId: item.productId,
      name: item.name,
      quantity: item.quantity,
      amount: item.itemTotal,
      prodImage: item.prodImage
    }));

    const orderPayload = {
      orderId: orderId,
      orderDescription: orderDescription,
      cartItems: cartItems,
      userId: user.id,
      amount: cartItems.itemTotal,
      totalAmount: cart.getTotalCost()
    };

    console.log(cart.items);
    try {
      const result = await axios.post(PLACEORDER_URL, orderPayload, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      console.log(result.data);
      navigate("/pay");
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div>
      <Navbar expand="sm">
        <Navbar.Brand href="/order">E-Commerce Store</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={handleShow}>Cart ({productCounts} Items)</Button>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onSubmit}>
            <FormControl
              type="text"
              placeholder="Order Description"
              name="orderDescription"
            />
            <FormControl
              type="text"
              placeholder="Order ID"
              name="orderId"
            />
            {productCounts > 0 ? (
              <>
                <p>Items in your Cart</p>
                {cart.items.map((currentProduct, idx) => (
                  <CartProduct
                    key={idx}
                    id={currentProduct.productId}
                    name={currentProduct.name}
                    quantity={currentProduct.quantity}
                    prodImage={currentProduct.prodImage}
                    totalAmount={currentProduct.totalAmount}
                  />
                ))}
                <h1>Total: €{parseFloat(cart.getTotalCost()).toFixed(2)}</h1>
                {auth && (
                  <Button variant="success" type="submit">
                    Purchase Items
                  </Button>
                )}
              </>
            ) : (
              <h1>There are No Items in Your Cart</h1>
            )}
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PlaceOrder;
