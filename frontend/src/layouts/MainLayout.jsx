import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
	return (
		<div className="font-serif">
			<div>
				<Navbar />
			</div>
			<div className="mt-16 md:mt-24 lg:mt-28">
				<Outlet />
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
};

export default MainLayout;
