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
	CheckCircle2,
	Calendar,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import API_BASE_URL from "../../axios/axios";
import toast from "react-hot-toast";
import useUserData from "../../hooks/useUserData";

const AddProduct = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const { user } = useAuth();
	const userdata = useUserData();

	const onSubmit = async (data) => {
		const productData = {
			author: data.author,
			category: data.category,
			description: data.description,
			price: parseFloat(data.price),
			sellerEmail: data.sellerEmail,
			stock: parseFloat(data.stock),
			title: data.title,
			imageURL: data.imageUrl || "",
			publishedYear: parseInt(data.publishedYear),
		};

		setIsSubmitting(true);
		const token = localStorage.getItem("access-token");
		try {
			const response = await API_BASE_URL.post(
				"/api/product/add-product",
				{ productData },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.data) {
				toast.success(
					<h1 className="font-serif text-center">Product added Successfully</h1>
				);
				reset();
			}
		} catch (error) {
			console.error("Submission error", error);
			toast.error(<h1 className="font-serif text-center">{error.message}</h1>);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center p-4">
			<div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden border border-emerald-100">
				{userdata?.status === "pending" ? (
					<div className="text-center text-red-500 my-4 text-lg">
						<p className="font-semibold">
							Role: <span className="font-normal">{userdata?.role}</span> (
							{userdata?.status})
						</p>
						<p className="mt-2 text-base">
							You can&apos;t add products yet because your seller status is
							still pending.
						</p>
					</div>
				) : (
					<div>
						{/* Enhanced Header */}
						<div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-5 flex items-center justify-between">
							<div className="flex items-center">
								<ShoppingCart className="mr-3 w-7 h-7" />
								<h2 className="text-xl font-bold tracking-wide">
									Add New Book
								</h2>
							</div>
						</div>

						{/* Form Container */}
						<form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{/* Book Title */}
								<div className="flex flex-col">
									<label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
										<Tag className="mr-2 w-5 h-5 text-emerald-500" /> Book Title
									</label>
									<input
										type="text"
										{...register("title", {
											required: "Book title is required",
											minLength: { value: 3, message: "Minimum 3 characters" },
										})}
										className="w-full px-3 py-2.5 text-sm border-2 border-emerald-100 rounded-lg focus:outline-none focus:border-emerald-400 transition-colors"
										placeholder="Enter book title"
									/>
									{errors.title && (
										<p className="text-red-500 text-xs mt-1 flex items-center">
											<Info className="mr-1 w-4 h-4" /> {errors.title.message}
										</p>
									)}
								</div>

								<div className="flex flex-col">
									<label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
										<Tag className="mr-2 w-5 h-5 text-emerald-500" /> Author
									</label>
									<input
										type="text"
										{...register("author", {
											required: "Author name is required",
											minLength: { value: 2, message: "Minimum 2 characters" },
										})}
										className="w-full px-3 py-2.5 text-sm border-2 border-emerald-100 rounded-lg focus:outline-none focus:border-emerald-400 transition-colors"
										placeholder="Enter author name"
									/>
									{errors.author && (
										<p className="text-red-500 text-xs mt-1 flex items-center">
											<Info className="mr-1 w-4 h-4" /> {errors.author.message}
										</p>
									)}
								</div>

								{/* Published Year - New Field */}
								<div className="flex flex-col">
									<label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
										<Calendar className="mr-2 w-5 h-5 text-purple-500" />{" "}
										Published Year
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
										className="w-full px-3 py-2.5 text-sm border-2 border-purple-100 rounded-lg focus:outline-none focus:border-purple-400 transition-colors"
										placeholder="Enter published year"
									/>
									{errors.publishedYear && (
										<p className="text-red-500 text-xs mt-1 flex items-center">
											<Info className="mr-1 w-4 h-4" />{" "}
											{errors.publishedYear.message}
										</p>
									)}
								</div>

								{/* Price */}
								<div className="flex flex-col">
									<label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
										<DollarSign className="mr-2 w-5 h-5 text-green-500" /> Price
									</label>
									<input
										type="number"
										step="0.01"
										{...register("price", {
											required: "Price is required",
											min: { value: 0, message: "Price must be positive" },
										})}
										className="w-full px-3 py-2.5 text-sm border-2 border-green-100 rounded-lg focus:outline-none focus:border-green-400 transition-colors"
										placeholder="Enter book price"
									/>
									{errors.price && (
										<p className="text-red-500 text-xs mt-1 flex items-center">
											<Info className="mr-1 w-4 h-4" /> {errors.price.message}
										</p>
									)}
								</div>

								{/* Stock */}
								<div className="flex flex-col">
									<label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
										<ShoppingCart className="mr-2 w-5 h-5 text-indigo-500" />{" "}
										Stock
									</label>
									<input
										type="number"
										{...register("stock", {
											required: "Stock quantity is required",
											min: { value: 0, message: "Stock must be non-negative" },
										})}
										className="w-full px-3 py-2.5 text-sm border-2 border-indigo-100 rounded-lg focus:outline-none focus:border-indigo-400 transition-colors"
										placeholder="Enter stock quantity"
									/>
									{errors.stock && (
										<p className="text-red-500 text-xs mt-1 flex items-center">
											<Info className="mr-1 w-4 h-4" /> {errors.stock.message}
										</p>
									)}
								</div>

								{/* Image URL */}
								<div className="flex flex-col">
									<label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
										<Image className="mr-2 w-5 h-5 text-emerald-500" /> Book
										Image URL
									</label>
									<input
										type="url"
										{...register("imageUrl", {
											pattern: {
												value: /^(https?:\/\/).*\.(jpg|jpeg|png|gif|webp)$/i,
												message: "Invalid image URL",
											},
										})}
										className="w-full px-3 py-2.5 text-sm border-2 border-emerald-100 rounded-lg focus:outline-none focus:border-emerald-400 transition-colors"
										placeholder="Enter image URL"
									/>
									{errors.imageUrl && (
										<p className="text-red-500 text-xs mt-1 flex items-center">
											<Info className="mr-1 w-4 h-4" />{" "}
											{errors.imageUrl.message}
										</p>
									)}
								</div>

								{/* Seller Email */}
								<div className="flex flex-col">
									<label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
										<Mail className="mr-2 w-5 h-5 text-red-500" /> Seller Email
									</label>
									<input
										type="email"
										defaultValue={user?.email}
										readOnly
										{...register("sellerEmail", {
											required: "Email is required",
											pattern: {
												value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
												message: "Invalid email address",
											},
										})}
										className="w-full px-3 py-2.5 text-sm border-2 border-red-100 rounded-lg focus:outline-none focus:border-red-400 transition-colors"
									/>
								</div>

								{/* Category */}
								<div className="flex flex-col w-full">
									<label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
										<Layers className="mr-2 w-5 h-5 text-emerald-500" />{" "}
										Book&apos;s Category
									</label>
									<select
										{...register("category", {
											required: "Category is required",
										})}
										className="w-full px-3 py-2.5 text-sm border-2 border-emerald-100 rounded-lg focus:outline-none focus:border-emerald-400 transition-colors"
									>
										<option value="">Select book category</option>
										<option value="fiction">Fiction</option>
										<option value="non-Fiction">Non-Fiction</option>
										<option value="science Fiction">Science Fiction</option>
										<option value="fantasy">Fantasy</option>
										<option value="thriller">Thriller</option>
										<option value="adventure">Adventure</option>
										<option value="dystopian">Dystopian</option>
									</select>
									{errors.category && (
										<p className="text-red-500 text-xs mt-1 flex items-center">
											<Info className="mr-1 w-4 h-4" />{" "}
											{errors.category.message}
										</p>
									)}
								</div>
							</div>

							{/* Description - Full Width */}
							<div className="flex flex-col">
								<label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
									<Layers className="mr-2 w-5 h-5 text-teal-500" /> Book&apos;s
									Description
								</label>
								<textarea
									{...register("description", {
										required: "Description is required",
										minLength: { value: 10, message: "Minimum 10 characters" },
									})}
									rows="4"
									className="w-full px-3 py-2.5 text-sm border-2 border-teal-100 rounded-lg focus:outline-none focus:border-teal-400 transition-colors resize-none"
									placeholder="Describe your clothing product"
								></textarea>
								{errors.description && (
									<p className="text-red-500 text-xs mt-1 flex items-center">
										<Info className="mr-1 w-4 h-4" />{" "}
										{errors.description.message}
									</p>
								)}
							</div>

							{/* Submit Button */}
							<button
								type="submit"
								disabled={isSubmitting}
								className={`w-full py-3 rounded-lg text-white font-semibold text-sm uppercase tracking-wide transition-all 
                        ${
													isSubmitting
														? "bg-gray-400 cursor-not-allowed"
														: "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
												} flex items-center justify-center`}
							>
								{isSubmitting ? (
									<>
										<svg
											className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
										Processing...
									</>
								) : (
									<>
										<CheckCircle2 className="mr-2 w-5 h-5" />
										Add New Book
									</>
								)}
							</button>
						</form>
					</div>
				)}
			</div>
		</div>
	);
};

export default AddProduct;
