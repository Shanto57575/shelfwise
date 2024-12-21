import BookCategories from "../components/BookCategories";
import ContactForm from "../components/ContactForm";
import Accordion from "../components/Home/Accordion";
import Banner from "../components/Home/Banner";
import FeaturedProduct from "../components/Home/FeaturedProduct";
import UserReview from "../components/Home/UserReview";

const Home = () => {
	return (
		<div>
			<Banner />
			<div className="container mx-auto">
				<FeaturedProduct />
				<BookCategories />
				<UserReview />
				<Accordion />
				<ContactForm />
			</div>
		</div>
	);
};

export default Home;
