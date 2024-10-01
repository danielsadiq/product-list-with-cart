/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext();

const initialItems = {
    items: [],
    orderActive: false,
};

function reducer(state, action) {
    const { items, orderActive } = state;

    switch (action.type) {
        case "dataReceived":
            return { ...state, items: action.payload };
        case "cartAdd":
            return {
                ...state,
                items: items.map((x) =>
                    x.id === action.payload.id ? { ...x, num: 1 } : x
                ),
            };
        case "cartIncrease":
            return {
                ...state,
                items: items.map((x) =>
                    x.id === action.payload.id ? { ...x, num: x.num + 1 } : x
                ),
            };
        case "cartDecrease":
            return {
                ...state,
                items: items.map((x) =>
                    x.id === action.payload.id ? { ...x, num: x.num - 1 } : x
                ),
            };
        case "cartRemove":
            return {
                ...state,
                items: items.map((x) =>
                    x.id === action.payload.id ? { ...x, num: 0 } : x
                ),
            };
        case "orderStatus":
            return { ...state, orderActive: !orderActive };
        case "reset":
            return { ...initialItems };
        default:
            break;
    }
}

function CartProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialItems);
    const { items } = state;
    const cart = items.filter((x) => x.num > 0);
    useEffect(function () {
        async function getData() {
            const res = await fetch("http://localhost:8000/items");
            const data = await res.json();
            dispatch({ type: "dataReceived", payload: data });
        }
        getData();
    }, []);
    return (
        <CartContext.Provider
            value={{
                cart,
                items,
                dispatch
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

function useCart(){
    const context = useContext(CartContext);
    return context
}

// eslint-disable-next-line react-refresh/only-export-components
export { CartProvider, useCart };
