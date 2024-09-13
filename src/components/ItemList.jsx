/* eslint-disable react/prop-types */
import styles from './ItemList.module.css'
import Item from "./Item"
function ItemList({items, dispatch}) {
    return (
        <ul className={styles.ulList}>
            {items.map(item => <Item item={item} key={item.name} dispatch={dispatch} />)}
        </ul>
    )
}

export default ItemList
