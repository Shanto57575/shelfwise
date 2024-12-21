import { createContext, useState } from "react";
import API_BASE_URL from "../axios/axios";
import useUserData from "../hooks/useUserData";
import toast from "react-hot-toast";

export const WishlistContext = createContext(null);

const WishlistProvider = ({ children }) => {
	const [wishlistcount, setWishlistCount] = useState(0);
	const userData = useUserData();
	const token = localStorage.getItem("access-token");

	const AddToWishlist = async (book) => {
		try {
			const response = await API_BASE_URL.post(
				"/api/wish/add-wishlist",
				{
					userId: userData?._id,
					book,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response.data) {
				toast.success(
					<h1 className="text-center font-serif">Books Added to wishlist</h1>
				);
				setWishlistCount((prevCount) => prevCount + 1);
			}
		} catch (error) {
			toast.error(
				<h1 className="text-center font-serif">
					{error.response.data.message}
				</h1>
			);
		}
	};

	const removeFromWishlist = async (bookId) => {
		console.log("bookid", bookId);
		try {
			const response = await API_BASE_URL.delete(`/api/wish/${bookId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.data) {
				toast.success(
					<h1 className="text-center font-serif">
						Books removed From wishlist
					</h1>
				);
				setWishlistCount((prevCount) => prevCount - 1);
				window.location.reload();
			}
		} catch (error) {
			console.log(error);
			toast.error(
				<h1 className="text-center font-serif">
					{error?.response?.data?.message}
				</h1>
			);
		}
	};

	const wishlistInfo = {
		AddToWishlist,
		removeFromWishlist,
		wishlistcount,
		setWishlistCount,
	};

	return (
		<WishlistContext.Provider value={wishlistInfo}>
			{children}
		</WishlistContext.Provider>
	);
};

export default WishlistProvider;
