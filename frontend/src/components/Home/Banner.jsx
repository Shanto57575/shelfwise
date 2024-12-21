import { Book, ArrowRight, Truck, Sparkles } from "lucide-react";

const BookShopBanner = () => {
	return (
		<div className="relative bg-gradient-to-br from-emerald-50 to-emerald-100 overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 grid md:grid-cols-2 gap-6 md:gap-10 items-center">
				{/* Left Content */}
				<div className="space-y-4 md:space-y-6 text-center md:text-left">
					<div className="inline-flex items-center justify-center mx-auto md:mx-0 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs md:text-sm font-medium">
						<Sparkles className="mr-2 w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
						Book Collection {new Date().getFullYear()}
					</div>

					<h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
						Explore Worlds
						<br />
						<span className="text-emerald-600">Beyond Imagination</span>
					</h1>

					<p className="text-sm md:text-xl text-gray-600 px-4 md:px-0">
						Dive into a curated collection of captivating books. From timeless
						classics to contemporary masterpieces, find your next literary
						adventure.
					</p>

					{/* Call to Action Buttons */}
					<div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 justify-center md:justify-start items-center">
						<button className="flex items-center bg-emerald-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-emerald-700 transition transform hover:scale-105 shadow-lg">
							Browse Books <Book className="ml-2 w-4 h-4 md:w-5 md:h-5" />
						</button>
						<button className="flex items-center border border-gray-300 text-gray-700 px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-gray-100 transition">
							Explore Genres{" "}
							<ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
						</button>
					</div>

					{/* Benefits */}
					<div className="flex justify-center md:justify-start space-x-4 md:space-x-6 mt-4 md:mt-8">
						<div className="flex items-center space-x-2">
							<Truck className="w-4 h-4 md:w-6 md:h-6 text-green-600" />
							<span className="text-xs md:text-base text-gray-600">
								Free Shipping
							</span>
						</div>
						<div className="flex items-center space-x-2">
							<Book className="w-4 h-4 md:w-6 md:h-6 text-emerald-600" />
							<span className="text-xs md:text-base text-gray-600">
								Easy Returns
							</span>
						</div>
					</div>
				</div>

				{/* Right Content - Image Placeholder */}
				<div className="relative hidden md:block">
					<div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
						<img
							src="https://t4.ftcdn.net/jpg/09/06/30/05/240_F_906300589_JU9VCAKdFn9foJuQOg8qexkjRyHO0WBI.jpg"
							alt="Book Collection"
							className="w-full h-auto lg:h-72 rounded-xl transform -rotate-3 hover:rotate-0 transition-transform duration-300 object-cover"
						/>
					</div>

					{/* Price Tag Overlay */}
					<div className="absolute top-6 md:top-10 -left-6 md:-left-10 bg-yellow-400 text-gray-900 px-2 py-1 md:px-4 md:py-2 rounded-full shadow-lg transform -rotate-12 text-xs md:text-base">
						<span className="font-bold">Up to 30% Off</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookShopBanner;
