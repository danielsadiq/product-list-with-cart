import { useEffect, useReducer } from "react";
import Main from "./components/Main";
import Cart from "./components/Cart";
import ItemList from "./components/ItemList";
// import "./App.css";

function reducer(state, action) {
    switch (action.type) {
        case "dataReceived":
            return { ...state, items: action.payload };
        case "cartAdd":
            state.items.map((x) => x.name === action.payload.name ? { ...action.payload, isActive: true }: x);
            console.log(action.payload);
                        
            // console.log(state.cart.filter(x => x.name===action.payload.name).length ? "Yes":"no");
            return {...state, cart: [...state.cart, { ...action.payload, isActive: false }]};
        case "cartRemove":
            return {...state, cart: state.cart.filter((x) => x.name !== action.payload.name),};
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
