const books = [
	{
		image:
			"https://i.pinimg.com/originals/78/08/84/780884074e7ae3d94e3dfcac7d30400c.jpg",
		title: "A Song of Ice and Fire",
		author: "George R. R. Martin",
		description: "A series about political intrigue, war, and dragons...",
	},
	{
		image:
			"https://t3.ftcdn.net/jpg/07/67/76/16/240_F_767761686_RMoLflna05IgMv50z7xNa0rLWMRJQxe3.jpg",
		title: "Harry Potter Series",
		author: "J.K Rowling",
		description:
			"A young wizard's journey to defeat dark forces and discover...",
	},
	{
		image:
			"https://www.pixartprinting.it/blog/wp-content/uploads/2023/12/5.jpg",
		title: "The Lord of the Rings",
		author: "J.R.R Tolkien",
		description: "A quest to destroy a powerful ring and defeat the dark...",
	},
	{
		image:
			"https://static1.srcdn.com/wordpress/wp-content/uploads/2024/05/j-r-r.jpg",
		title: "The Hobbit",
		author: "J.R.R Tolkien",
		description: "Bilbo Baggins' unexpected adventure to reclaim treasure...",
	},
];

const FeaturedProduct = () => {
	return (
		<div className="px-4 py-12">
			<div className="text-center mb-10">
				<h2 className="text-4xl font-extrabold text-gray-800 mb-4">
					Featured Books
				</h2>
				<p className="text-gray-600 text-lg max-w-2xl mx-auto">
					Explore our exclusive collection of books that inspire, entertain, and
					educate.
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{/* Map through books array to create book cards */}
				{books.map((book, index) => (
					<div
						key={index}
						className="border rounded-lg shadow-lg shadow-gray-500 hover:shadow-md duration-300 p-4"
					>
						<img
							src={book.image}
							alt={book.title}
							className="w-full h-48 object-cover mb-4"
						/>
						<h3 className="text-xl font-semibold text-gray-800">
							{book.title}
						</h3>
						<p className="text-gray-600 mt-2">{book.author}</p>
						<p className="text-gray-500 mt-2">{book.description}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default FeaturedProduct;
