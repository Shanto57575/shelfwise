import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	ShoppingCart,
	DollarSign,
	Tag,
	Image,
	Mail,
	Layers,
	Info,
	Calendar,
} from "lucide-react";
import toast from "react-hot-toast";
import API_BASE_URL from "../../axios/axios";

const UpdateProduct = ({ book, onUpdateSuccess }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			title: book.title,
			author: book.author,
			publishedYear: book.publishedYear,
			price: book.price,
			stock: book.stock,
			imageUrl: book.imageURL,
			description: book.description,
			category: book.category,
		},
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = async (data) => {
		const updatedProductData = {
			author: data.author,
			category: data.category,
			description: data.description,
			price: parseFloat(data.price),
			sellerEmail: book?.sellerEmail,
			stock: parseFloat(data.stock),
			title: data.title,
			imageURL: data.imageUrl || "",
			publishedYear: parseInt(data.publishedYear),
		};

		setIsSubmitting(true);
		const token = localStorage.getItem("access-token");
		try {
			const response = await API_BASE_URL.put(
				`/api/product/${book._id}`,
				{ updatedProductData },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.data) {
				toast.success("Product updated successfully");
				reset();
				onUpdateSuccess();
			}
		} catch (error) {
			console.error("Submission error", error);
			toast.error("Failed to update the product");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="bg-white p-4">
			<div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-4 rounded-t-lg flex items-center justify-between">
				<div className="flex items-center">
					<ShoppingCart className="mr-2 w-5 h-5" />
					<h2 className="text-lg font-bold tracking-wide">Update Book</h2>
				</div>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{/* Book Title */}
					<div className="flex flex-col">
						<label className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
							<Tag className="mr-1 w-4 h-4 text-emerald-500" /> Book Title
						</label>
						<input
							type="text"
							{...register("title", {
								required: "Book title is required",
								minLength: { value: 3, message: "Minimum 3 characters" },
							})}
							className="w-full px-3 py-2 text-sm border border-emerald-200 rounded-md focus:outline-none focus:border-emerald-400 transition-colors"
							placeholder="Enter book title"
						/>
						{errors.title && (
							<p className="text-red-500 text-xs mt-1 flex items-center">
								<Info className="mr-1 w-3 h-3" /> {errors.title.message}
							</p>
						)}
					</div>

					{/* Author */}
					<div className="flex flex-col">
						<label className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
							<Tag className="mr-1 w-4 h-4 text-emerald-500" /> Author
						</label>
						<input
							type="text"
							{...register("author", {
								required: "Author name is required",
								minLength: { value: 2, message: "Minimum 2 characters" },
							})}
							className="w-full px-3 py-2 text-sm border border-emerald-200 rounded-md focus:outline-none focus:border-emerald-400 transition-colors"
							placeholder="Enter author name"
						/>
						{errors.author && (
							<p className="text-red-500 text-xs mt-1 flex items-center">
								<Info className="mr-1 w-3 h-3" /> {errors.author.message}
							</p>
						)}
					</div>

					{/* Published Year */}
					<div className="flex flex-col">
						<label className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
							<Calendar className="mr-1 w-4 h-4 text-purple-500" /> Published
							Year
						</label>
						<input
							type="number"
							{...register("publishedYear", {
								required: "Published year is required",
								min: { value: 1000, message: "Invalid year" },
								max: {
									value: new Date().getFullYear(),
									message: "Cannot be a future year",
								},
							})}
							className="w-full px-3 py-2 text-sm border border-purple-200 rounded-md focus:outline-none focus:border-purple-400 transition-colors"
							placeholder="Enter published year"
						/>
						{errors.publishedYear && (
							<p className="text-red-500 text-xs mt-1 flex items-center">
								<Info className="mr-1 w-3 h-3" /> {errors.publishedYear.message}
							</p>
						)}
					</div>

					{/* Price */}
					<div className="flex flex-col">
						<label className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
							<DollarSign className="mr-1 w-4 h-4 text-green-500" /> Price
						</label>
						<input
							type="number"
							step="0.01"
							{...register("price", {
								required: "Price is required",
								min: { value: 0, message: "Price must be positive" },
							})}
							className="w-full px-3 py-2 text-sm border border-green-200 rounded-md focus:outline-none focus:border-green-400 transition-colors"
							placeholder="Enter book price"
						/>
						{errors.price && (
							<p className="text-red-500 text-xs mt-1 flex items-center">
								<Info className="mr-1 w-3 h-3" /> {errors.price.message}
							</p>
						)}
					</div>

					{/* Stock */}
					<div className="flex flex-col">
						<label className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
							<ShoppingCart className="mr-1 w-4 h-4 text-indigo-500" /> Stock
						</label>
						<input
							type="number"
							{...register("stock", {
								required: "Stock quantity is required",
								min: { value: 0, message: "Stock must be non-negative" },
							})}
							className="w-full px-3 py-2 text-sm border border-indigo-200 rounded-md focus:outline-none focus:border-indigo-400 transition-colors"
							placeholder="Enter stock quantity"
						/>
						{errors.stock && (
							<p className="text-red-500 text-xs mt-1 flex items-center">
								<Info className="mr-1 w-3 h-3" /> {errors.stock.message}
							</p>
						)}
					</div>

					{/* Image URL */}
					<div className="flex flex-col">
						<label className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
							<Image className="mr-1 w-4 h-4 text-blue-500" /> Image URL
						</label>
						<input
							type="url"
							{...register("imageUrl")}
							className="w-full px-3 py-2 text-sm border border-blue-200 rounded-md focus:outline-none focus:border-blue-400 transition-colors"
							placeholder="Enter image URL"
						/>
					</div>

					{/* Description */}
					<div className="flex flex-col sm:col-span-2">
						<label className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
							<Layers className="mr-1 w-4 h-4 text-yellow-500" /> Description
						</label>
						<textarea
							{...register("description")}
							className="w-full px-3 py-2 text-sm border border-yellow-200 rounded-md focus:outline-none focus:border-yellow-400 transition-colors"
							placeholder="Enter book description"
							rows="3"
						/>
					</div>

					{/* Seller Email (Read Only) */}
					<div className="flex flex-col sm:col-span-2">
						<label className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
							<Mail className="mr-1 w-4 h-4 text-pink-500" /> Seller Email
						</label>
						<input
							type="email"
							value={book?.sellerEmail}
							readOnly
							className="w-full px-3 py-2 text-sm border border-pink-200 rounded-md bg-gray-100"
						/>
					</div>
				</div>

				{/* Submit Button */}
				<div className="flex justify-center">
					<button
						type="submit"
						disabled={isSubmitting}
						className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-md font-semibold text-sm disabled:bg-gray-400 transition-all duration-300 hover:from-emerald-600 hover:to-emerald-700"
					>
						{isSubmitting ? "Updating..." : "Update Product"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default UpdateProduct;
