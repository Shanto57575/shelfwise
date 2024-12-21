import { Trash, Plus, Minus } from "lucide-react";
import useCart from "../hooks/useCart";
import { useEffect, useState } from "react";
import API_BASE_URL from "../axios/axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const MyCart = () => {
	const { cartCount, removeFromCart, setCartCount } = useCart();

	const [cart, setCart] = useState([]);
	const [loading, setLoading] = useState(false);
	const token = localStorage.getItem("access-token");

	useEffect(() => {
		setLoading(true);
		const fetchCartData = async () => {
			try {
				const response = await API_BASE_URL.get(`/api/cart/all-cart`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (response.data) {
					setCart(response.data);
					console.log(response?.data?.length);
					setCartCount(response.data?.length);
					setLoading(false);
				}
				console.log(response.data);
			} catch (error) {
				console.error("Failed to fetch cart data", error);
				toast.error("Failed to load cart items");
				setLoading(false);
			}
		};

		fetchCartData();
	}, []);

	if (loading) return <Loader />;
	return (
		<div className="w-full max-w-4xl mx-auto px-4 py-8">
			<h1 className="text-2xl font-bold text-gray-900 text-center mb-6">
				My Cart
			</h1>

			{/* Cart Items List */}
			<div className="space-y-6">
				{cartCount === 0 ? (
					<div className="text-center text-gray-500">
						<p>Your cart is empty.</p>
					</div>
				) : (
					cart?.map((item) => (
						<div
							key={item.book?.id}
							className="flex items-center justify-between p-4 bg-white shadow-lg rounded-lg"
						>
							{/* Item Image */}
							<div className="flex-shrink-0 w-24 h-24">
								<img
									src={item.book?.imageURL}
									alt={item.book?.title}
									className="w-full h-full object-cover rounded-lg"
								/>
							</div>

							{/* Item Details */}
							<div className="flex-1 ml-4">
								<h3 className="text-lg font-semibold text-gray-900">
									{item.book?.title}
								</h3>
								<p className="text-sm text-gray-600">{item.book?.author}</p>
							</div>

							{/* Item Quantity & Price */}
							<div className="flex items-center space-x-4">
								<div className="flex items-center space-x-2">
									<button className="p-1 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300">
										<Minus className="w-4 h-4" />
									</button>
									<span className="text-sm font-semibold text-gray-900">
										{item.quantity}
									</span>
									<button className="p-1 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300">
										<Plus className="w-4 h-4" />
									</button>
								</div>
								<span className="text-sm font-bold text-gray-900">
									{item.price}
								</span>
							</div>

							{/* Remove Button */}
							<button
								onClick={() => removeFromCart(item.book?._id)}
								className="ml-4 text-red-600 hover:text-red-800"
							>
								<Trash className="w-5 h-5" />
							</button>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default MyCart;
