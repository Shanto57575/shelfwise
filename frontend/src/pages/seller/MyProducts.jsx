import { useEffect, useState } from "react";
import useUserData from "../../hooks/useUserData";
import toast from "react-hot-toast";
import API_BASE_URL from "../../axios/axios";
import Loader from "../../components/Loader";
import { Book, Package, Mail } from "lucide-react";
import UpdateProduct from "./UpdateProduct";

const MyProducts = () => {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedBook, setSelectedBook] = useState(null);
	const user = useUserData();
	const token = localStorage.getItem("access-token");

	useEffect(() => {
		if (user?.email && token) {
			const fetchAllBooksBySeller = async () => {
				setLoading(true);
				try {
					const response = await API_BASE_URL.get(
						`/api/product/seller/${user?.email}`,
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
					if (response.data) {
						setBooks(response.data);
					}
				} catch (error) {
					console.log(error);
				} finally {
					setLoading(false);
				}
			};

			fetchAllBooksBySeller();
		} else {
			setLoading(true);
		}
	}, [user?.email, token]);

	const handleBookDelete = async (bookId) => {
		try {
			const response = await API_BASE_URL.delete(`/api/product/${bookId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.data) {
				toast.success(
					<h1 className="font-serif text-center">
						Product Deleted successfully
					</h1>
				);
				window.location.reload();
			}
		} catch (error) {
			console.error("Submission error", error);
			toast.error(
				<h1 className="font-serif text-center">Failed to Delete the product</h1>
			);
		}
	};

	const handleEditClick = (book) => {
		setSelectedBook(book);
		document.getElementById("update_modal").showModal();
	};

	const handleUpdateSuccess = () => {
		document.getElementById("update_modal").close();
		window.location.reload();
	};

	if (loading) {
		return <Loader />;
	}

	if (books.length === 0) {
		return (
			<div className="flex items-center justify-center h-96">
				<p className="text-gray-700 text-3xl">No Books YET</p>
			</div>
		);
	}

	return (
		<div className="p-2 sm:p-6 bg-gray-50 min-h-screen">
			<h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-8 text-gray-800">
				My Products{" "}
				<span className="text-xl sm:text-2xl text-gray-500">
					({books.length})
				</span>
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
				{books.map((book) => (
					<div
						key={book?._id}
						className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
					>
						<div>
							<img
								src={book?.imageURL}
								alt={book?.title}
								className="w-full h-48 sm:h-64 object-cover"
							/>
						</div>
						<div className="p-4 sm:p-6">
							<div className="flex justify-between items-start mb-2 sm:mb-4">
								<h2 className="text-lg sm:text-2xl font-bold text-gray-800 line-clamp-1">
									{book?.title}
								</h2>
								<span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm font-medium">
									${book?.price}
								</span>
							</div>
							<div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
								<div className="flex items-center text-gray-600">
									<Book className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
									<span className="font-medium">{book?.author}</span>
								</div>
								<div className="flex items-center text-gray-600">
									<Package className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
									<span>
										Stock:{" "}
										<span className="font-medium text-gray-800">
											{book?.stock}
										</span>
									</span>
								</div>
								<div className="flex items-center text-gray-600">
									<Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
									<span className="truncate">{book?.sellerEmail}</span>
								</div>
							</div>
							<p className="mt-2 sm:mt-4 text-gray-600 text-xs sm:text-sm line-clamp-2 mb-2 sm:mb-4">
								{book?.description}
							</p>

							<div className="grid grid-cols-2 gap-2 sm:gap-4">
								<button
									onClick={() => handleEditClick(book)}
									className="w-full px-2 sm:px-4 py-1 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-xs sm:text-sm"
								>
									Edit Book
								</button>
								<button
									onClick={() => handleBookDelete(book._id)}
									className="w-full px-2 sm:px-4 py-1 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium text-xs sm:text-sm"
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			<dialog id="update_modal" className="modal modal-bottom sm:modal-middle">
				<div className="modal-box w-11/12 max-w-5xl">
					<form method="dialog">
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					{selectedBook && (
						<UpdateProduct
							book={selectedBook}
							onUpdateSuccess={handleUpdateSuccess}
						/>
					)}
				</div>
			</dialog>
		</div>
	);
};

export default MyProducts;
