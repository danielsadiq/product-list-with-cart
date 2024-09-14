/* eslint-disable react/prop-types */
import styles from "./OrderConfirmed.module.css";
import orderImg from "./assets/images/icon-order-confirmed.svg";
function OrderConfirmed({ cart, dispatch }) {
    const TOTAL_AMOUNT = cart.reduce((a, b) => a + (b.price*b.num), 0);

    return (
        <div className={styles.orderDiv}>
            <img src={orderImg} alt="order-confirm" />
            <h1>Order Confirmed</h1>
            <p>We hope you enjoy your food!</p>
            <>
            <ul className={styles.itemsList}>
                {cart?.map((item) => (
                    <li key={item.name}>
                        <div className={styles.listItem}>
                            <img src={item.image.thumbnail} alt="img"/>
                            <div>
                                <strong>{item.name}</strong>
                                <p>
                                    <span className={styles.quantity}>{item.num}x </span>
                                    <span className={styles.price}>@${item.price.toFixed(2)}</span>
                                </p>
                            </div>
                            <p className={styles.totalPrice}>${(item.price * item.num).toFixed(2)}</p>
                        </div>
                        <hr></hr>
                    </li>
                ))}
            </ul>
            <div className={styles.orderTotal}>
                <p>Order Total</p>
                <h2>${TOTAL_AMOUNT.toFixed(2)}</h2>
            </div>
            <button className={styles.orderBtn} onClick={()=> dispatch({type:"orderStatus"})}>Start New Order</button>
            </>
        </div>
    );
}

export default OrderConfirmed;
