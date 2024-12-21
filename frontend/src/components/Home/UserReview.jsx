import Review from "./Review";

const UserReview = () => {
	return (
		<div className="py-12 px-4">
			<h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
				What Our Customers Say
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Review profile="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww" />
				<Review profile="https://t4.ftcdn.net/jpg/04/31/64/75/240_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg" />
				<Review profile="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs7QPGzBefaOz5xC_y7q_Ncne7Kd8J8f85xw&s" />
			</div>
		</div>
	);
};

export default UserReview;
