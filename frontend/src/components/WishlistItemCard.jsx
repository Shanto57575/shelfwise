import { X } from "lucide-react";
import useWishlist from "../hooks/useWishlist";

const WishlistItemCard = ({ product }) => {
	const { removeFromWishlist } = useWishlist();
	console.log(product);

	return (
		<div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
			<div className="relative">
				<img
					src={product.imageURL}
					alt={product.title}
					className="w-full h-72 object-fit"
				/>
				<button
					onClick={() => removeFromWishlist(product?._id)}
					className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
					aria-label="Remove from wishlist"
				>
					<X size={20} />
				</button>
			</div>

			<div className="p-4">
				<div className="flex items-center justify-between">
					<h3 className="text-sm font-semibold mb-2 truncate">
						{product.title}
					</h3>
					<h3 className="text-sm font-semibold mb-2 truncate">
						{product.author}
					</h3>
				</div>
				<div className="flex justify-between items-center mt-3">
					<span className="text-xl font-bold text-gray-800">
						${product.price?.toFixed(2)}
					</span>
					<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	);
};

export default WishlistItemCard;
