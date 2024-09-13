import { useEffect, useReducer } from "react";
import Main from "./components/Main";
import Cart from "./components/Cart";
import ItemList from "./components/ItemList";
// import "./App.css";

function reducer(state, action) {
    const {items, cart} = state;
    switch (action.type) {
        case "dataReceived":
            return { ...state, items: action.payload };
        case "cartAdd":
            items.map((x) => x.name === action.payload.name ? action.payload: x);
            // cart.map((x) => x.name === action.payload.name ? action.payload: x) ;
            console.log([...cart, ...cart.map(x => x.name === action.payload.name ? action.payload: x)]);
            
            // if (action.payload.num === 1) return {...state, cart:[...cart, action.payload]};
            // return {...state, cart: cart.map(x => x.name === action.payload.name ? action.payload: x)
            return {...state, cart: action.payload.num === 1 ? [...cart, action.payload]: cart.map(x => x.name === action.payload.name ? action.payload: x)}
        case "cartRemove":
            return {...state, cart: cart.filter((x) => x.name !== action.payload.name),};
        default:
            break;
    }
}

const initialItems = {
    items: [],
    cart: [],
};

function App() {
    const [state, dispatch] = useReducer(reducer, initialItems);
    const { items, cart } = state;
    useEffect(function () {
        async function getData() {
            const res = await fetch("http://localhost:8000/items");
            const data = await res.json();
            dispatch({ type: "dataReceived", payload: data });
        }
        getData();
    }, []);

    return (
        <div className="container">
            <Main items={items}>
                <ItemList items={items} dispatch={dispatch} />
            </Main>
            <Cart cart={cart} dispatch={dispatch} />
        </div>
    );
}

export default App;
