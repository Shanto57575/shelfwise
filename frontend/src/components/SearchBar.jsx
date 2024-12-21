import { Search, X } from "lucide-react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
	const clearSearch = () => {
		setSearchTerm("");
	};

	return (
		<div className="relative w-full max-w-md mx-auto mb-5">
			<div className="relative">
				<input
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder="Search by title, author name, published year..."
					className="w-full px-4 py-2 pl-10 pr-20 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<div className="absolute top-3 left-3">
					<Search size={20} />
				</div>
				<div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
					{searchTerm && (
						<button
							onClick={clearSearch}
							className="text-gray-500 hover:text-gray-700 focus:outline-none"
						>
							<X size={20} />
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default SearchBar;
