import { Quote, Star } from "lucide-react";

const Review = ({ profile }) => {
	return (
		<div className="bg-white rounded-2xl shadow-lg p-5 relative overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl">
			<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>

			<div className="flex items-center space-x-4 mb-3">
				<img
					className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200"
					src={profile}
					alt="User avatar"
				/>
				<div>
					<h3 className="text-base font-semibold text-gray-800">John Doe</h3>
					<p className="text-xs text-gray-500">Software Engineer</p>
				</div>
				<div className="ml-auto flex items-center space-x-1">
					{[...Array(5)].map((_, i) => (
						<Star
							key={i}
							className={`w-4 h-4 ${
								i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
							}`}
						/>
					))}
				</div>
			</div>

			<div className="relative pl-5 before:absolute before:left-0 before:top-0 before:w-1 before:h-full before:bg-blue-500 before:rounded-full">
				<Quote className="absolute left-0 top-0 w-4 h-4 text-gray-300 -ml-5 -mt-1" />
				<p className="text-sm text-gray-600 italic">
					Exceeded my expectations! The quality is outstanding and it arrived
					earlier than expected.
				</p>
			</div>

			<div className="mt-3 flex justify-between items-center text-xs text-gray-500">
				<span>May 15, 2023</span>
				<span className="text-blue-500 font-medium">Verified Purchase</span>
			</div>
		</div>
	);
};

export default Review;
