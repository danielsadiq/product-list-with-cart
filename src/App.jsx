/* eslint-disable no-unused-vars */
import { useEffect, useReducer } from "react";
import Main from "./components/Main";
import Cart from "./components/Cart";
import ItemList from "./components/ItemList";
import OrderConfirmed from "./components/OrderConfirmed";
// import "./App.css";

function reducer(state, action) {
    const {items, cart, orderActive} = state;
    switch (action.type) {
        case "dataReceived":
            return { ...state, items: action.payload };
        case "cartAdd":
            cart.map((x) => x.name === action.payload.name ? action.payload: x) ;
            if (action.payload.num === 0) return {...state, cart: cart.filter(x => x.name !== action.payload.name)}
            return {...state, cart: [...cart.filter(x => x.name !== action.payload.name), action.payload]};
        case "cartRemove":
            return {...state, cart: cart.filter((x) => x.name !== action.payload.name),};
        case "orderStatus":
            return {...state, orderActive: !orderActive}
        default:
            break;
    }
}

const initialItems = {
    items: [],
    cart: [],
    orderActive:false,
};

function App() {
    const [state, dispatch] = useReducer(reducer, initialItems);
    const { items, cart, orderActive } = state;
    useEffect(function () {
        async function getData() {
            const res = await fetch("http://localhost:8000/items");
            const data = await res.json();
            dispatch({ type: "dataReceived", payload: data });
        }
        getData();
    }, []);

    return (
        <>
        <div className={`grey-out ${orderActive ? 'show': "false"}`} aria-checked={orderActive ? true : false} ></div>
        <div className="container">
            <Main items={items}>
                <ItemList items={items} dispatch={dispatch} />
            </Main>
            <Cart cart={cart} dispatch={dispatch} />
        </div>
        {orderActive ? <OrderConfirmed cart={cart} dispatch={dispatch} /> : ""}
        </>
    );
}

export default App;
