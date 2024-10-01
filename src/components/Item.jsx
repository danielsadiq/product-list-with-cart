/* eslint-disable react/prop-types */
import styles from "./Item.module.css";
import plus from "./assets/images/icon-increment-quantity.svg";
import minus from "./assets/images/icon-decrement-quantity.svg";
import AddToCart from './AddToCart';
import { useCart } from "../contexts/CartContext";

function Item({item}) {
    const { cart, dispatch} = useCart();
    const num = cart.filter(x => x.id === item.id)?.[0]?.['num'];
    return (
        <li>
            <div className={styles.listItem}>
                <div className={styles.imgBtn}>
                    <img src={item.image.mobile} alt={item.name} />
                    {num ? (
                        <div className={styles.btnPad}>
                            <button onClick={() => 
                                dispatch({type: "cartDecrease",payload: item })
                            }>
                                <img src={minus} alt="minus"/>
                            </button>
                            {num}
                            <button onClick={() => 
                                    dispatch({type: "cartIncrease", payload: item})
                                }>
                                <img src={plus} alt="plus"/>
                            </button>
                        </div>
                    ): 
                        <AddToCart onClick={() => 
                            dispatch({type: "cartAdd", payload: item})
                        }  /> 
                    } 
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
