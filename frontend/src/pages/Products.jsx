import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import FilterBar from "../components/products/FilterBar";
import SearchBar from "../components/SearchBar";
import SortByPrice from "../components/SortByPrice";
import API_BASE_URL from "../axios/axios";
import ProductCard from "../components/ProductCard";

const Products = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortOption, setSortOption] = useState("asc");
	const [category, setCategory] = useState("");
	const [allCategory, setAllCategory] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [limit, setLimit] = useState(9);
	const [showFilter, setShowFilter] = useState(false);

	useEffect(() => {
		setLoading(true);
		const fetchProducts = async () => {
			try {
				const res = await API_BASE_URL.get(
					`/api/product/all-products?search=${searchTerm}&page=${page}&limit=${limit}&sort=${sortOption}&category=${category}`
				);

				const totalDocuments = res.data.totalDocuments || 0;
				const calculatedTotalPage = Math.ceil(totalDocuments / limit) || 1;

				setProducts(res.data.books);
				setAllCategory(res.data.categories);
				setTotalPage(calculatedTotalPage);

				if (page > calculatedTotalPage) {
					setPage(1);
				}

				setLoading(false);
			} catch (error) {
				console.error("Error fetching products:", error);
				setLoading(false);
			}
		};
		fetchProducts();
	}, [category, searchTerm, sortOption, page, limit]);

	const handleReset = () => {
		setSearchTerm("");
		setSortOption("asc");
		setCategory("");
		setPage(1);
	};

	useEffect(() => {
		if (page > totalPage) {
			setPage(totalPage);
		}
	}, [limit, totalPage, page]);

	const handlePagination = (pageNo) => {
		if (pageNo > 0 && pageNo <= totalPage) {
			setPage(pageNo);
		} else if (pageNo > totalPage) {
			setPage(totalPage);
		} else {
			setPage(1);
		}
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
			{/* Mobile Filter Toggle */}
			<div className="md:hidden mb-4">
				<button
					onClick={() => setShowFilter(!showFilter)}
					className="flex items-center justify-center w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
				>
					<Filter className="mr-2" />
					{showFilter ? "Hide Filters" : "Show Filters"}
				</button>
			</div>

			{/* Search and Sort Section */}
			<div className="w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 mb-6">
				<div className="flex flex-col md:flex-row w-full items-center space-y-3 md:space-y-0 md:space-x-4">
					<div className="w-full md:w-2/3">
						<SearchBar
							searchTerm={searchTerm}
							setSearchTerm={setSearchTerm}
							className="w-full"
						/>
					</div>
					<div className="w-full md:w-1/3">
						<SortByPrice
							sortOption={sortOption}
							setSortOption={setSortOption}
							className="w-full"
						/>
					</div>
				</div>
			</div>

			{/* Main Content Area */}
			<div className="flex flex-col md:flex-row gap-6">
				{/* Sidebar Filter - Desktop */}
				<div
					className={`w-full md:w-1/4 lg:w-1/5 ${
						showFilter ? "block" : "hidden md:block"
					} transition-all duration-300 ease-in-out`}
				>
					<FilterBar
						allCategory={allCategory}
						category={category}
						setCategory={setCategory}
						handleReset={handleReset}
					/>
				</div>

				{/* Products Grid */}
				<div className="flex-1 bg-gray-50 rounded-lg p-4 md:p-6">
					<h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
						Products
					</h1>

					{/* Loading State */}
					{loading ? (
						<div className="flex justify-center items-center h-64">
							<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
						</div>
					) : (
						<>
							{products?.length === 0 ? (
								<div className="text-center text-3xl text-gray-900 py-16">
									No products found
								</div>
							) : (
								<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
									{products &&
										products.map((product) => (
											<div key={product._id} className="flex justify-center">
												<ProductCard product={product} />
											</div>
										))}
								</div>
							)}
						</>
					)}

					{/* Pagination */}
					<div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
						<div className="flex items-center space-x-2">
							<button
								onClick={() => handlePagination(page - 1)}
								disabled={page === 1}
								className="bg-blue-500 text-white px-5 py-2 rounded disabled:opacity-50 hover:bg-blue-600 transition duration-300"
							>
								<ChevronLeft />
							</button>
							<span className="text-gray-700">
								Page {page} of {totalPage}
							</span>
							<button
								onClick={() => handlePagination(page + 1)}
								disabled={page === totalPage}
								className="bg-blue-500 text-white px-5 py-2 rounded disabled:opacity-50 hover:bg-blue-600 transition duration-300"
							>
								<ChevronRight />
							</button>
						</div>

						<select
							value={limit}
							onChange={(e) => {
								const newLimit = Number(e.target.value);
								setLimit(newLimit);
								const newTotalPages = Math.ceil(products?.length / newLimit);
								if (page > newTotalPages) {
									setPage(newTotalPages);
								}
							}}
							className="border rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="3">3 per page</option>
							<option value="6">6 per page</option>
							<option value="9">9 per page</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Products;
