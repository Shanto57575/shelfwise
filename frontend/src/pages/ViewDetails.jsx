import {
	User,
	Tag,
	Calendar,
	Package,
	Mail,
	DollarSign,
	BookOpen,
	Share2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_BASE_URL from "../axios/axios";

const ViewDetails = () => {
	const [book, setBook] = useState();
	const { bookId } = useParams();
	console.log(bookId);

	const fetchBookDetails = async () => {
		const response = await API_BASE_URL.get(`/api/product/${bookId}`);
		setBook(response.data);
	};

	useEffect(() => {
		fetchBookDetails();
	}, []);

	return (
		<div className="max-w-7xl mx-auto px-4 py-8">
			<div className="bg-white rounded-xl shadow-lg overflow-hidden">
				<div className="grid md:grid-cols-2 gap-8 p-6">
					<div className="space-y-4">
						<div className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-100">
							<img
								src={book?.imageURL}
								alt={book?.title}
								className="w-full h-full object-cover"
							/>
						</div>
					</div>

					<div className="space-y-6">
						<div className="space-y-2">
							<h1 className="text-3xl font-bold text-gray-900">
								{book?.title}
							</h1>
							<div className="flex items-center gap-2 text-2xl text-green-600">
								<DollarSign size={24} />
								<span className="font-bold">{book?.price.toFixed(2)}</span>
							</div>
						</div>

						<div className="prose prose-gray">
							<h3 className="text-lg font-semibold">Description</h3>
							<p className="text-gray-600">{book?.description}</p>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
								<User className="text-gray-500" size={20} />
								<div>
									<p className="text-sm text-gray-500">Author</p>
									<p className="font-medium">{book?.author}</p>
								</div>
							</div>

							<div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
								<Tag className="text-gray-500" size={20} />
								<div>
									<p className="text-sm text-gray-500">Category</p>
									<p className="font-medium">{book?.category}</p>
								</div>
							</div>

							<div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
								<Calendar className="text-gray-500" size={20} />
								<div>
									<p className="text-sm text-gray-500">Published Year</p>
									<p className="font-medium">{book?.publishedYear}</p>
								</div>
							</div>

							<div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
								<Package className="text-gray-500" size={20} />
								<div>
									<p className="text-sm text-gray-500">Stock</p>
									<p className="font-medium">{book?.stock} copies</p>
								</div>
							</div>
						</div>

						<div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
							<Mail className="text-blue-500" size={20} />
							<div>
								<p className="text-sm text-blue-600">Seller Contact</p>
								<p className="font-medium">{book?.sellerEmail}</p>
							</div>
						</div>

						<div className="grid md:grid-cols-2 gap-4">
							<button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
								<BookOpen size={20} />
								<span>Preview Sample</span>
							</button>

							<button className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
								<Share2 size={20} />
								<span>Share Book</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewDetails;
