import {
	ShoppingCart,
	Heart,
	Tag,
	Calendar,
	User,
	Package,
} from "lucide-react";
import { Link } from "react-router-dom";
import useWishlist from "../hooks/useWishlist";
import useCart from "../hooks/useCart";
import useUserData from "../hooks/useUserData";

const ProductCard = ({ product }) => {
	const { AddToWishlist } = useWishlist();
	const { AddToCart } = useCart();
	const user = useUserData();

	return (
		<div className="flex flex-col h-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
			{/* Image Container */}
			<div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
				<img
					src={product?.imageURL}
					alt={product?.title}
					className="w-full h-full object-cover"
				/>
			</div>

			{/* Content Container */}
			<div className="flex flex-col flex-grow p-4 space-y-4">
				{/* Title and Price */}
				<div className="flex justify-between items-start gap-3">
					<h2 className="text-lg font-semibold text-gray-800 line-clamp-1 flex-grow">
						{product?.title}
					</h2>
					<span className="text-lg font-bold text-green-600 whitespace-nowrap">
						${product?.price?.toFixed(2)}
					</span>
				</div>

				{/* Description */}
				<p className="text-sm text-gray-600 line-clamp-2 min-h-[40px]">
					{product?.description}
				</p>

				{/* Info Grid */}
				<div className="space-y-2">
					{/* Year and Author */}
					<div className="grid grid-cols-2 gap-2">
						<div className="flex items-center text-sm px-3 py-2 bg-gray-50 rounded-lg">
							<Calendar size={14} className="mr-2 text-gray-500 shrink-0" />
							<span className="truncate">{product?.publishedYear}</span>
						</div>
						<div className="flex items-center text-sm px-3 py-2 bg-gray-50 rounded-lg">
							<User size={14} className="mr-2 text-gray-500 shrink-0" />
							<span className="truncate">{product?.author}</span>
						</div>
					</div>

					{/* Category and Stock */}
					<div className="grid grid-cols-2 gap-2">
						<div className="flex items-center text-sm px-3 py-2 bg-blue-50 text-blue-600 rounded-lg">
							<Tag size={14} className="mr-2 shrink-0" />
							<span className="truncate">{product?.category}</span>
						</div>
						<div className="flex items-center text-sm px-3 py-2 bg-gray-50 rounded-lg">
							<Package size={14} className="mr-2 text-gray-500 shrink-0" />
							<span className="truncate">Stock: {product?.stock}</span>
						</div>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="space-y-2 mt-auto pt-2">
					<div className="grid grid-cols-2 gap-2">
						<button
							disabled={user && (user.role == "seller" || user.role == "admin")}
							onClick={() => AddToCart(product)}
							className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors duration-200"
						>
							<ShoppingCart size={18} />
							Cart
						</button>
						<button
							disabled={user && (user.role == "seller" || user.role == "admin")}
							onClick={() => AddToWishlist(product)}
							className="bg-gray-100 hover:bg-gray-200 text-gray-700"
						>
							<span className="flex items-center justify-center gap-2">
								<Heart size={20} />
								Wishlist
							</span>
						</button>
					</div>

					<Link
						to={`/view-details/${product._id}`}
						className="block w-full bg-slate-950 text-white hover:bg-slate-800 text-center py-2.5 rounded-lg transition-colors duration-300"
					>
						View Details
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
