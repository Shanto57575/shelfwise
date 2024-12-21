import {
	Book,
	Heart,
	Home,
	LayoutDashboard,
	LogOut,
	Package,
	PlusCircle,
	ShoppingCart,
	Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useUserData from "../../hooks/useUserData";

const sidebarLinks = [
	{
		icon: <LayoutDashboard className="mr-3 group-hover:text-emerald-600" />,
		text: "Profile",
		to: "/dashboard/overview",
	},
	{
		icon: <Home className="mr-3 group-hover:text-emerald-600" />,
		text: "Home",
		to: "/",
	},
	{
		icon: <Book className="mr-3 group-hover:text-emerald-600" />,
		text: "Explore Books",
		to: "/products",
	},
];

const sellerRoutes = [
	{
		icon: <Package className="mr-3 group-hover:text-emerald-600" />,
		text: "My Books",
		to: "/dashboard/my-books",
	},
	{
		icon: <PlusCircle className="mr-3 group-hover:text-emerald-600" />,
		text: "Add Book",
		to: "/dashboard/add-product",
	},
];

const buyerRoutes = [
	{
		icon: <ShoppingCart className="mr-3 group-hover:text-emerald-600" />,
		text: "My Cart",
		to: "/dashboard/cart",
	},
	{
		icon: <Heart className="mr-3 group-hover:text-emerald-600" />,
		text: "Wishlist",
		to: "/dashboard/wishlist",
	},
];

const adminRoutes = [
	{
		icon: <Users className="mr-3 group-hover:text-emerald-600" />,
		text: "All Users",
		to: "/dashboard/manage-users",
	},
];

const Sidebar = ({ closeMobileSidebar }) => {
	const { logoutUser } = useAuth();
	const user = useUserData();
	const navigate = useNavigate();

	const handleLogout = () => {
		logoutUser();
		toast.success(
			<h1 className="font-serif text-center">Logged Out Successfully</h1>
		);
		navigate("/");
	};

	return (
		<div className="h-full flex flex-col p-4 shadow-lg">
			{/* Logo or Brand */}
			<Link to="/">
				<div className="text-2xl font-bold text-center text-emerald-600 mb-8">
					ShelfWise
				</div>
			</Link>
			{/* Navigation Links */}
			<nav className="flex-1">
				<ul className="space-y-2">
					{sidebarLinks.map((link, index) => (
						<li key={index}>
							<Link
								to={link.to}
								className="flex items-center p-3 rounded-lg group hover:bg-emerald-100 transition duration-200 text-gray-900 hover:text-emerald-800"
								onClick={closeMobileSidebar}
							>
								{link.icon}
								{link.text}
							</Link>
						</li>
					))}
				</ul>
			</nav>
			{user.role === "seller" && (
				<nav className="flex-1">
					<ul className="space-y-2">
						{sellerRoutes.map((link, index) => (
							<li key={index}>
								<Link
									to={link.to}
									className="flex items-center p-3 rounded-lg group hover:bg-emerald-100 transition duration-200 text-gray-900 hover:text-emerald-800"
									onClick={closeMobileSidebar}
								>
									{link.icon}
									{link.text}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			)}
			{user.role === "buyer" && (
				<nav className="flex-1">
					<ul className="space-y-2">
						{buyerRoutes.map((link, index) => (
							<li key={index}>
								<Link
									to={link.to}
									className="flex items-center p-3 rounded-lg group hover:bg-emerald-100 transition duration-200 text-gray-900 hover:text-emerald-800"
									onClick={closeMobileSidebar}
								>
									{link.icon}
									{link.text}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			)}
			{user.role === "admin" && (
				<nav className="flex-1">
					<ul className="space-y-2">
						{adminRoutes.map((link, index) => (
							<li key={index}>
								<Link
									to={link.to}
									className="flex items-center p-3 rounded-lg group hover:bg-emerald-100 transition duration-200 text-gray-900 hover:text-emerald-800"
									onClick={closeMobileSidebar}
								>
									{link.icon}
									{link.text}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			)}

			{/* Sign Out */}
			<div className="mt-auto">
				<Link
					onClick={() => handleLogout()}
					className="flex items-center justify-center w-full p-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition duration-200"
				>
					<LogOut className="mr-3" />
					Sign Out
				</Link>
			</div>
		</div>
	);
};

export default Sidebar;
