/* eslint-disable react/prop-types */
import styles from "./Item.module.css";
import add from "./assets/images/icon-add-to-cart.svg";
import plus from "./assets/images/icon-increment-quantity.svg";
import minus from "./assets/images/icon-decrement-quantity.svg";
import { useState } from "react";
function Item({ item, dispatch }) {
    const [num, setNum] = useState(0);
    return (
        <li>
            <div className={styles.listItem}>
                <div className={styles.imgBtn}>
                    <img src={item.image.tablet} alt={item.name} />
                    {num > 0 ? (
                        <div className={styles.btnPad}>
                            <button onClick={() => {
                                dispatch({type: "cartAdd",payload: { ...item, num: num - 1 },});
                                setNum((num) => num - 1);
                                }}
                            >
                                <img src={minus} alt="minus"/>
                            </button>

                            {num}

                            <button
                                onClick={() => {
                                    dispatch({
                                        type: "cartAdd",
                                        payload: { ...item, num: num + 1 },
                                    });
                                    setNum((num) => num + 1);
                                }}
                            >
                                <img src={plus} alt="plus"/>
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => {
                                dispatch({
                                    type: "cartAdd",
                                    payload: { ...item, num: num + 1 },
                                });
                                setNum((num) => num + 1);
                                // console.log(num+1);
                            }}
                        >
                            <img
                                src={add}
                                alt="add"
                                className={styles.addImage}
                            />
                            Add to Cart
                        </button>
                    )}
                </div>
                <div className={styles.textDiv}>
                    <p>{item.category}</p>
                    <p className={styles.title}>{item.name}</p>
                    <p className={styles.price}>${item.price.toFixed(2)}</p>
                </div>
            </div>
        </li>
    );
}

export default Item;
