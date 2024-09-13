/* eslint-disable react/prop-types */
import styles from './Cart.module.css'
import remove from "./assets/images/icon-remove-item.svg";
function CartItem({item, dispatch}) {
    return (
        <>
            <li key={item.name} className={styles.cartItem}>
                <div>
                    <p className={styles.itemName}>{item.name}</p>
                    <p>
                        <span className={styles.quantity}>1x </span>
                        <span className={styles.price}>
                            {" "}
                            @${item.price.toFixed(2)}
                        </span>
                        <span className={styles.totalPrice}>
                            {" "}
                            ${item.price.toFixed(2)}
                        </span>
                    </p>
                </div>
                <button
                    onClick={() => {
                        dispatch({ type: "cartRemove", payload: item });
                    }}
                >
                    <img src={remove} alt="remove" />
                </button>
            </li>
            <hr></hr>
        </>
    );
}

export default CartItem;
