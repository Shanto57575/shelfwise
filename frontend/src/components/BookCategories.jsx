import { useState } from "react";
import { Star } from "lucide-react";

const BookCategories = () => {
	const [activeTab, setActiveTab] = useState("fiction");

	const categories = {
		fiction: [
			{
				id: 1,
				title: "The Midnight Library",
				author: "Matt Haig",
				rating: 4.5,
				price: "$14.99",
				cover:
					"https://media.npr.org/assets/img/2020/09/30/815-u8gacyl_custom-6b18da73bda60986b0448abff5dc75ee9cb9837f.jpg",
				description: "A tale of infinite choices and possibilities.",
			},
			{
				id: 2,
				title: "The Seven Husbands of Evelyn Hugo",
				author: "Taylor Jenkins Reid",
				rating: 4.8,
				price: "$16.99",
				cover:
					"https://static-01.daraz.com.bd/p/3708938ad7f69b9bbc820be5461b37d2.jpg",
				description: "The captivating life of a Hollywood icon.",
			},
			{
				id: 3,
				title: "Project Hail Mary",
				author: "Andy Weir",
				rating: 4.7,
				price: "$15.99",
				cover:
					"https://m.media-amazon.com/images/M/MV5BM2U0NDE2MDMtYWU3ZC00OTUzLWIxYmItMTY3YWRjNmFkYmIzXkEyXkFqcGc@._V1_.jpg",
				description: "A lone astronaut's mission to save Earth.",
			},
			{
				id: 4,
				title: "Tomorrow, and Tomorrow, and Tomorrow",
				author: "Gabrielle Zevin",
				rating: 4.6,
				price: "$13.99",
				cover:
					"https://static-01.daraz.com.bd/p/e0e32ebc88252d053a8a4fed4204f382.jpg",
				description: "A story about friendship and creativity.",
			},
		],
		nonfiction: [
			{
				id: 5,
				title: "Atomic Habits",
				author: "James Clear",
				rating: 4.9,
				price: "$12.99",
				cover:
					"https://cdn.shopify.com/s/files/1/0194/2855/files/atomic-habits_600x600.jpg?v=1624825894",
				description: "Practical strategies for building better habits.",
			},
			{
				id: 6,
				title: "The Body Keeps the Score",
				author: "Bessel van der Kolk",
				rating: 4.8,
				price: "$15.99",
				cover:
					"https://images.theconversation.com/files/477041/original/file-20220802-23-z39j1.png?ixlib=rb-4.1.0&q=45&auto=format&w=1000&fit=clip",
				description: "How trauma affects the body and mind.",
			},
			{
				id: 7,
				title: "Thinking, Fast and Slow",
				author: "Daniel Kahneman",
				rating: 4.6,
				price: "$17.99",
				cover:
					"https://static-01.daraz.com.bd/p/1517c6d2c504b12929c203e59b63508f.jpg",
				description: "Insights into human decision-making processes.",
			},
			{
				id: 8,
				title: "Sapiens",
				author: "Yuval Noah Harari",
				rating: 4.7,
				price: "$19.99",
				cover:
					"https://i5.walmartimages.com/seo/Sapiens-de-Animales-a-Dioses-Sapiens-a-Brief-History-of-Humankind-Paperback-9788499926223_ad80d64a-faa6-4b76-a0f2-e6099cacbd30.f9c916e9ea2185950b2c501aff32bc00.jpeg",
				description: "A brief history of humankind's evolution.",
			},
		],
		mystery: [
			{
				id: 9,
				title: "The Silent Patient",
				author: "Alex Michaelides",
				rating: 4.5,
				price: "$13.99",
				cover:
					"https://static-01.daraz.com.bd/p/87f572f11a88ca761a720b37e0ba7ec8.jpg",
				description: "A gripping psychological thriller.",
			},
			{
				id: 10,
				title: "The Thursday Murder Club",
				author: "Richard Osman",
				rating: 4.3,
				price: "$14.99",
				cover:
					"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1582287822l/46000520.jpg",
				description: "A quirky group solves a murder mystery.",
			},
			{
				id: 11,
				title: "Verity",
				author: "Colleen Hoover",
				rating: 4.6,
				price: "$12.99",
				cover:
					"https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1634158558i/59344312.jpg",
				description: "A dark and twisted romantic thriller.",
			},
			{
				id: 12,
				title: "The Paris Apartment",
				author: "Lucy Foley",
				rating: 4.4,
				price: "$15.99",
				cover:
					"https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1645550948i/58468990.jpg",
				description: "A mystery unfolds in a Parisian apartment.",
			},
		],
	};

	return (
		<div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-8">
			{/* Header Section */}
			<div className="text-center mb-6 sm:mb-8">
				<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
					Browse Categories for Your Next Read
				</h1>
				<p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
					Explore our curated collection of fiction, non-fiction, and thrilling
					mysteries to find your perfect read.
				</p>
			</div>

			{/* Tab Navigation */}
			<div className="flex flex-col justify-center sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 mb-4 sm:mb-6 sm:border-b">
				{["fiction", "nonfiction", "mystery"].map((tab) => (
					<button
						key={tab}
						onClick={() => setActiveTab(tab)}
						className={`px-3 py-2 text-sm sm:text-base font-medium rounded-lg sm:rounded-t-lg sm:rounded-b-none transition-colors duration-200 ${
							activeTab === tab
								? "bg-emerald-600 text-white"
								: "bg-gray-100 text-gray-600 hover:bg-gray-200 sm:hover:bg-gray-100"
						} ${
							tab === activeTab ? "sm:border-b-2 sm:border-emerald-600" : ""
						}`}
					>
						{tab.charAt(0).toUpperCase() + tab.slice(1)}
					</button>
				))}
			</div>

			{/* Book Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
				{categories[activeTab].map((book) => (
					<div
						key={book.id}
						className="flex flex-col bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
					>
						{/* Image section */}
						<div className="w-full flex-shrink-0">
							<img
								src={book.cover}
								alt={book.title}
								className="w-full h-48 object-cover rounded-t-lg"
							/>
						</div>

						{/* Content section */}
						<div className="flex-1 p-4">
							<h3 className="text-base font-semibold text-gray-900 truncate">
								{book?.title}
							</h3>
							<p className="text-sm text-gray-600 mt-1 truncate">
								{book?.author}
							</p>
							<p className="text-sm text-gray-900 mt-1 truncate">
								{book?.description}...
							</p>

							<div className="mt-3 flex items-center justify-between">
								<div className="flex items-center">
									<Star className="w-5 h-5 text-yellow-400 fill-current" />
									<span className="ml-1 text-sm text-gray-600">
										{book.rating}
									</span>
								</div>
								<span className="text-base font-bold text-gray-900">
									{book.price}
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default BookCategories;
