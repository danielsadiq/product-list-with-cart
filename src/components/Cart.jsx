/* eslint-disable react/prop-types */
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
// import { useState } from "react";
// import remove from "./assets/images/icon-remove-item.svg";
import emptyCart from "./assets/images/illustration-empty-cart.svg";

function Cart({ cart, dispatch }) {
    const TOTAL_AMOUNT = cart.reduce((a, b) => a + b.price, 0);
    // const [num, setNum] = useState(0);

    return (
        <div className={styles.cartBody}>
            <h3>Your Cart ({cart.length})</h3>
            {!cart.length ? (
                <div className={styles.emptyCart}>
                    <img src={emptyCart} alt="empty" />
                    <p>Your added items will appear here</p>
                </div>
            ) : (
                <ul className={styles.cartList}>
                    {cart.map((item) => 
                        <CartItem item={item} dispatch={dispatch} key={Math.random()*100000} />
                    )}

                    <div className={styles.orderTotal}>
                        <p>Order Total</p>
                        <h2>${TOTAL_AMOUNT.toFixed(2)}</h2>
                    </div>
                </ul>
            )}
        </div>
    );
}

export default Cart;
