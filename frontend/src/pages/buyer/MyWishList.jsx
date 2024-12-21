import { useEffect, useState } from "react";
import API_BASE_URL from "../../axios/axios";
import WishlistItemCard from "../../components/WishlistItemCard";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import useWishlist from "../../hooks/useWishlist";

const MyWishList = () => {
	const [wishlist, setWishlist] = useState([]);
	const [loading, setLoading] = useState(false);
	const token = localStorage.getItem("access-token");
	const { setWishlistCount } = useWishlist();

	const getFromWishlist = async () => {
		setLoading(true);
		try {
			const response = await API_BASE_URL.get("/api/wish/all-wishlist-books", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setWishlist(response.data);
			setWishlistCount(response?.data?.length);
			console.log(response.data[0].book);
			setLoading(false);
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
		}
	};

	useEffect(() => {
		getFromWishlist();
	}, []);

	if (loading) <Loader />;

	return (
		<div className="container mx-auto px-4 mt-10">
			<h1 className="text-center text-3xl font-bold mb-8">My Wishlist</h1>

			{wishlist.length === 0 ? (
				<div className="text-center text-3xl font-bold flex justify-center">
					Your wishlist is Empty
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{wishlist.map((product) => (
						<WishlistItemCard key={product.book._id} product={product.book} />
					))}
				</div>
			)}
		</div>
	);
};

export default MyWishList;
