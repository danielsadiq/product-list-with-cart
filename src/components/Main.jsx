/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import ItemList from "./ItemList";
import styles from "./Main.module.css";

function Main({ children, items }) {
    
    return (
        <div className={styles.main}>
            <h1>Desserts</h1>
            {children}
            {/* <ItemList items={items}/> */}
        </div>
    );
}

export default Main;
