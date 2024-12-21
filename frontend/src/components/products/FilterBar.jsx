import { Filter, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

const FilterBar = ({ allCategory, category, setCategory, handleReset }) => {
	const [selectedCategory, setSelectedCategory] = useState(category);

	useEffect(() => {
		setSelectedCategory(category);
	}, [category]);

	const clothingCategories = [
		{ value: "", label: "Select clothing category" },
		...allCategory.map((cat) => ({ value: cat, label: cat })),
	];

	return (
		<div className="p-4 bg-gray-100 shadow-md rounded-lg w-full max-w-xs mx-auto sm:min-h-screen transform transition-all duration-300 hover:shadow-lg">
			<h3 className="text-lg flex flex-col items-center gap-2 font-semibold mb-4 text-gray-800">
				<div className="flex items-center gap-1">
					<Filter className="mr-2" size={20} /> Filters
				</div>
				<button
					onClick={handleReset}
					className="flex items-center justify-center gap-1 border p-2 rounded-lg bg-white hover:bg-black hover:text-white duration-500 w-full"
				>
					Reset
					<RotateCcw size={18} />
				</button>
			</h3>
			<div className="space-y-4">
				<div>
					<label
						htmlFor="category-select"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Category
					</label>
					<select
						id="category-select"
						value={selectedCategory}
						onChange={(e) => {
							setSelectedCategory(e.target.value);
							setCategory(e.target.value);
						}}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
					>
						{clothingCategories.map((cat) => (
							<option key={cat.value} value={cat.value}>
								{cat.label}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
};

export default FilterBar;
