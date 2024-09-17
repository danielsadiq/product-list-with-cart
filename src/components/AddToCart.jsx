/* eslint-disable react/prop-types */
import add from "./assets/images/icon-add-to-cart.svg";
function AddToCart({onClick}) {
    return (
        <button onClick={onClick} >
            <img src={add} alt="add" />
            Add to Cart
        </button>
    );
}

export default AddToCart;
