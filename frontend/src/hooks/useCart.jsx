import { useContext } from "react";
import { CartContext } from "../cartWishlistProvider/CartProvider";

const useCart = () => {
	return useContext(CartContext);
};

export default useCart;
