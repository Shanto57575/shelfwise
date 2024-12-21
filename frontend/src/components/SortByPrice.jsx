import { useEffect, useState } from "react";

const SortByPrice = ({ sortOption, setSortOption }) => {
	const [selectedOption, setSelectedOption] = useState(sortOption);

	useEffect(() => {
		setSelectedOption(sortOption);
	}, [sortOption]);

	return (
		<div className="mb-5">
			<select
				value={selectedOption}
				onChange={(e) => {
					setSelectedOption(e.target.value);
					setSortOption(e.target.value);
				}}
				className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
			>
				<option value="">Sort by Price</option>
				<option value="asc">Low to High</option>
				<option value="desc">High to Low</option>
			</select>
		</div>
	);
};

export default SortByPrice;
