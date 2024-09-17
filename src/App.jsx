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
            items.map(x => x.id === action.payload.id ? {...x, num: 1}: x)
            return {...state, items:items.map(x => x.id === action.payload.id ? {...x, num: 1}: x)}
            // return {...state, cart:[...cart, {...action.payload, num:1}]}
        case 'cartIncrease':
            // return {...state, cart: cart.map(x => x.id === action.payload.id ? {...x, num: x.num + 1}: x)}
            return {...state, items: items.map(x => x.id === action.payload.id ? {...x, num: x.num + 1}: x)}
        case 'cartDecrease':
            // return {...state, cart: cart.map(x => x.id === action.payload.id ? {...x, num: x.num - 1}: x)}
            return {...state, items: items.map(x => x.id === action.payload.id ? {...x, num: x.num - 1}: x)}
        case "cartRemove":
            return {...state, items: items.map(x => x.id === action.payload.id ? {...x, num: 0}: x)};
        case "orderStatus":
            return {...state, orderActive: !orderActive}
        case "reset":
            return {...initialItems}
        default:
            break;
    }
}

const initialItems = {
    items: [],
    orderActive:false,
};


function App() {
    const [state, dispatch] = useReducer(reducer, initialItems);
    const { items,orderActive } = state;
    const cart = items.filter(x => x.num > 0); 
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
                <ItemList items={items} dispatch={dispatch} cart={cart} />
            </Main>
            <Cart cart={cart} dispatch={dispatch} />
        </div>
        <div className="order">
            {orderActive ? <OrderConfirmed cart={cart} dispatch={dispatch} /> : ""}
        </div>
        </>
    );
}

export default App;
