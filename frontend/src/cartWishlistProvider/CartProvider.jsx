import { createContext, useState } from "react";
import useUserData from "../hooks/useUserData";
import toast from "react-hot-toast";
import API_BASE_URL from "../axios/axios";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
	const [cartCount, setCartCount] = useState(0);
	const [cart, setCart] = useState([]);
	const userData = useUserData();
	const token = localStorage.getItem("access-token");

	const AddToCart = async (book) => {
		try {
			const response = await API_BASE_URL.post(
				"/api/cart/add-cart",
				{ userId: userData?._id, book },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response.data) {
				setCart((prevCart) => [...prevCart, book]);
				setCartCount((prevCount) => prevCount + 1);
				toast.success("Book added to cart");
			}
		} catch (error) {
			toast.error(error?.response?.data?.message || "Error adding to cart");
		}
	};

	const removeFromCart = async (bookId) => {
		try {
			const response = await API_BASE_URL.delete(`/api/cart/${bookId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.data) {
				setCartCount((prevCount) => prevCount - 1);
				toast.success("Book removed from cart");
				window.location.reload();
			}
		} catch (error) {
			toast.error(error?.response?.data?.message || "Error removing from cart");
		}
	};

	const cartInfo = {
		cart,
		cartCount,
		setCartCount,
		AddToCart,
		removeFromCart,
	};

	return (
		<CartContext.Provider value={cartInfo}>{children}</CartContext.Provider>
	);
};

export default CartProvider;
