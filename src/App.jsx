/* eslint-disable no-unused-vars */
import { useEffect, useReducer } from "react";
import Main from "./components/Main";
import Cart from "./components/Cart";
import ItemList from "./components/ItemList";
import OrderConfirmed from "./components/OrderConfirmed";
// import "./App.css";

import { CartProvider, useCart } from "./contexts/CartContext";


function App() {
    return (
        <CartProvider>
        {/* <div className={`grey-out ${orderActive ? 'show': "false"}`} aria-checked={orderActive ? true : false} ></div> */}
        <div className="container">
            <Main>
                <ItemList />
            </Main>
            <Cart />
        </div>
        <OrderConfirmed/>
            {/* {orderActive ? <OrderConfirmed cart={cart} dispatch={dispatch} /> : ""} */}
        
        </CartProvider>
    );
}

export default App;
