import styles from './ItemList.module.css'
import Item from "./Item"
import { useCart } from '../contexts/CartContext'
function ItemList() {
    const {items} = useCart();
    
    return (
        <ul className={styles.ulList}>
            {items.map(item => <Item item={item} key={item.name} />)}
        </ul>
    )
}

export default ItemList
