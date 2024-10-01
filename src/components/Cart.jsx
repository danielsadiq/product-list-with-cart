import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import emptyCart from "./assets/images/illustration-empty-cart.svg";
import carbon from "./assets/images/icon-carbon-neutral.svg";
import { useCart } from "../contexts/CartContext";


function Cart() {
    const {cart, dispatch} = useCart();
    
    const TOTAL_AMOUNT = cart.reduce((a, b) => a + (b.price*b.num), 0);
    const TOTAL_NUM = cart.reduce((a, b) => a + b.num, 0);

    return (
        <div className={styles.cartBody}>
            <h3>Your Cart ({TOTAL_NUM})</h3>
            {!cart.length ? (
                <div className={styles.emptyCart}>
                    <img src={emptyCart} alt="empty" />
                    <p>Your added items will appear here</p>
                </div>
            ) : (
                <>
                <ul className={styles.cartList}>
                    {cart.map((item) => 
                        <CartItem item={item} dispatch={dispatch} key={Math.random()*100000} />
                    )}
                </ul>
                <div className={styles.orderTotal}>
                    <p>Order Total</p>
                    <h2>${TOTAL_AMOUNT.toFixed(2)}</h2>
                </div>
                <div className={styles.carbon}>
                    <img src={carbon} alt="carbon"/>
                    <p>This is a <span>carbon-neutral</span> delivery</p>
                </div>
                <button className={styles.orderBtn} onClick={()=> dispatch({type:"orderStatus"})}>Confirm Order</button>
                
                </>
            )}
        </div>
    );
}

export default Cart;
