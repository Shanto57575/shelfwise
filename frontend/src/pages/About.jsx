import { Book, Heart, ShoppingCart, Award, Info } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
	return (
		<div className="bg-gray-50">
			{/* Hero Section */}
			<div className="relative w-full bg-gradient-to-r from-emerald-600 to-green-600 py-20 px-4 sm:px-6 lg:px-8 text-white text-center">
				<h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
					Welcome to Shelf Wise
				</h1>
				<p className="text-lg sm:text-xl max-w-3xl mx-auto mb-6">
					Discover your next adventure at Shelf Wise. Whether you&lsquo;re a
					lover of fiction, a seeker of knowledge, or a connoisseur of
					mysteries, we have something for everyone. Explore, read, and get
					inspired.
				</p>
				<Link to="/">
					<button className="bg-white text-emerald-600 font-semibold text-lg px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300">
						Start Exploring
					</button>
				</Link>
			</div>

			{/* Mission & Values Section */}
			<div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
				<div className="max-w-7xl mx-auto text-center">
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
						Our Mission & Values
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
						<div className="bg-emerald-50 rounded-lg shadow-lg p-6 transition-all hover:shadow-xl">
							<Book className="w-12 h-12 text-emerald-600 mb-4 mx-auto" />
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								Curated Collections
							</h3>
							<p className="text-gray-600">
								Handpicked books across all genres to ensure you always find the
								perfect read.
							</p>
						</div>
						<div className="bg-green-50 rounded-lg shadow-lg p-6 transition-all hover:shadow-xl">
							<Heart className="w-12 h-12 text-pink-600 mb-4 mx-auto" />
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								Passion for Reading
							</h3>
							<p className="text-gray-600">
								Our love for books drives us to constantly curate and bring you
								the best of literature.
							</p>
						</div>
						<div className="bg-yellow-50 rounded-lg shadow-lg p-6 transition-all hover:shadow-xl">
							<ShoppingCart className="w-12 h-12 text-orange-600 mb-4 mx-auto" />
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								Seamless Shopping
							</h3>
							<p className="text-gray-600">
								Enjoy a hassle-free shopping experience with fast and secure
								online ordering.
							</p>
						</div>
						<div className="bg-green-50 rounded-lg shadow-lg p-6 transition-all hover:shadow-xl">
							<Award className="w-12 h-12 text-indigo-600 mb-4 mx-auto" />
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								Award-Winning Service
							</h3>
							<p className="text-gray-600">
								We are committed to providing top-tier customer service,
								ensuring your satisfaction every step of the way.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Why Choose Us Section */}
			<div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto text-center">
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
						Why Choose Shelf Wise?
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all">
							<Info className="w-12 h-12 text-emerald-600 mb-4" />
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								Comprehensive Selection
							</h3>
							<p className="text-gray-600">
								Our extensive collection spans across fiction, non-fiction, and
								specialized genres to fit every reader&lsquo;s taste.
							</p>
						</div>
						<div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all">
							<ShoppingCart className="w-12 h-12 text-green-600 mb-4" />
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								Affordable Prices
							</h3>
							<p className="text-gray-600">
								We offer great deals, ensuring you get more books for your
								budget.
							</p>
						</div>
						<div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all">
							<Heart className="w-12 h-12 text-pink-600 mb-4" />
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								Love for Books
							</h3>
							<p className="text-gray-600">
								We&lsquo;re more than just a shop. We’re a community that shares
								a love for reading and books.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
