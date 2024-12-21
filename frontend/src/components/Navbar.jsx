import { useState, useRef, useEffect } from "react";
import {
	Home,
	User,
	LogOut,
	ChevronDown,
	Menu,
	X,
	Heart,
	ShoppingCart,
	UsersRound,
	Book,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import useUserData from "../hooks/useUserData";
import useWishlist from "../hooks/useWishlist";
import useCart from "../hooks/useCart";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const { user, logoutUser } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const dropdownRef = useRef(null);
	const currentUser = useUserData();
	const { wishlistcount } = useWishlist();
	const { cartCount } = useCart();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		setIsMenuOpen(false);
		setIsDropdownOpen(false);
	}, [location]);

	const handleLogout = () => {
		logoutUser();
		toast.success(
			<h1 className="font-serif text-center">Logged Out Successfully</h1>
		);
		navigate("/");
		setIsMenuOpen(false);
	};

	const navRoutes = [
		{
			label: "About Us",
			href: "/about",
			icon: UsersRound,
			authRequired: false,
		},
		{
			label: "Dashboard",
			href: "/dashboard/overview",
			icon: Home,
			authRequired: true,
		},
		{
			label: "Explore Books",
			href: "/products",
			icon: Book,
			authRequired: false,
		},
	];

	const profileRoutes = [
		{
			label: "Profile",
			href: "/dashboard/overview",
			icon: User,
		},
		{
			label: "Logout",
			action: handleLogout,
			icon: LogOut,
		},
	];

	return (
		<nav className="fixed top-0 left-0 right-0 w-full bg-white shadow-md z-50">
			{/* First Line: Wishlist, Profile, and Actions */}
			<div className="flex justify-between items-center px-4 md:px-8 lg:px-12 py-4 border-b">
				{/* Logo */}
				<Link to="/" className="text-3xl font-bold text-emerald-600">
					ShelfWise
				</Link>

				{/* Desktop First Line Actions */}
				<div className="hidden md:flex items-center space-x-4">
					{/* Wishlist and Cart */}
					{currentUser?.role === "buyer" && (
						<div className="flex items-center space-x-4">
							<Link to="/dashboard/wishlist" className="relative">
								<Heart className="w-7 h-7 hover:text-rose-600" />
								<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
									{wishlistcount || 0}
								</span>
							</Link>
							<Link to="/dashboard/cart" className="relative">
								<ShoppingCart className="w-7 h-7 hover:text-emerald-600" />
								<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
									{cartCount || 0}
								</span>
							</Link>
						</div>
					)}

					{/* User Dropdown or Sign In/Up */}
					{user ? (
						<div ref={dropdownRef} className="relative">
							<button
								onClick={() => setIsDropdownOpen(!isDropdownOpen)}
								className="flex items-center"
							>
								<User className="mx-2 w-8 h-8 border-2 border-black hover:bg-black hover:text-white duration-500 rounded-full p-1" />
								{user?.name || user?.displayName || "Profile"}
								<ChevronDown className="ml-1 w-4 h-4" />
							</button>
							{isDropdownOpen && (
								<div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
									{profileRoutes.map((route) =>
										route.href ? (
											<Link
												key={route.href}
												to={route.href}
												className="flex items-center p-3 hover:bg-gray-100"
											>
												<route.icon className="mr-2" />
												{route.label}
											</Link>
										) : (
											<button
												key={route.label}
												onClick={route.action}
												className="w-full flex items-center p-3 hover:bg-gray-100 text-left"
											>
												<route.icon className="mr-2" />
												{route.label}
											</button>
										)
									)}
								</div>
							)}
						</div>
					) : (
						// Ensure Sign In/Sign Up buttons are rendered for desktop
						<div className="hidden md:flex space-x-2">
							<Link
								to="/sign-in"
								className="border bg-emerald-600 text-white hover:bg-emerald-500 px-4 py-2.5 rounded-md"
							>
								Sign In
							</Link>
							<Link
								to="/sign-up"
								className="border bg-emerald-600 text-white hover:bg-emerald-500 px-4 py-2.5 rounded-md"
							>
								Sign Up
							</Link>
						</div>
					)}
				</div>

				{/* Mobile Menu Toggle */}
				<button
					className="md:hidden"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					{isMenuOpen ? <X /> : <Menu />}
				</button>
			</div>

			{/* Second Line: Centered Navigation Links */}
			<div className="hidden md:flex justify-center items-center p-2 border-b">
				<div className="flex space-x-6">
					{navRoutes
						.filter((route) => !route.authRequired || user)
						.map((route) => (
							<Link
								key={route.href}
								to={route.href}
								className="flex items-center hover:text-emerald-600"
							>
								<route.icon className="mr-2 w-7 h-7" />
								{route.label}
							</Link>
						))}
				</div>
			</div>

			{/* Mobile Menu */}
			{isMenuOpen && (
				<div className="md:hidden fixed inset-0 bg-white overflow-y-auto z-50 pt-16 p-4">
					{/* Mobile User Section */}
					{user ? (
						<div className="flex justify-between items-center mb-6">
							<div className="flex items-center">
								<User className="mx-2 w-8 h-8 border-2 border-black hover:bg-black hover:text-white duration-500 rounded-full p-1" />
								<span>{user?.name || user?.displayName || "Profile"}</span>
							</div>
							<button onClick={() => setIsMenuOpen(false)}>
								<X />
							</button>
						</div>
					) : (
						<div className="flex justify-between items-center mb-6">
							<button
								onClick={() => setIsMenuOpen(false)}
								className="absolute top-4 right-4"
							>
								<X />
							</button>
						</div>
					)}

					{/* Mobile Navigation Links */}
					<div className="space-y-4">
						{navRoutes
							.filter((route) => !route.authRequired || user)
							.map((route) => (
								<Link
									key={route.href}
									to={route.href}
									className="flex items-center p-3 hover:bg-gray-100 rounded-lg"
									onClick={() => setIsMenuOpen(false)}
								>
									<route.icon className="mr-3" />
									{route.label}
								</Link>
							))}

						{/* Mobile Profile Routes (only when logged in) */}
						{user && (
							<>
								<div className="border-t my-4"></div>
								{profileRoutes.map((route) =>
									route.href ? (
										<Link
											key={route.href}
											to={route.href}
											className="flex items-center p-3 hover:bg-gray-100 rounded-lg"
											onClick={() => setIsMenuOpen(false)}
										>
											<route.icon className="mr-3" />
											{route.label}
										</Link>
									) : (
										<button
											key={route.label}
											onClick={() => {
												route.action();
												setIsMenuOpen(false);
											}}
											className="w-full flex items-center p-3 hover:bg-gray-100 text-left rounded-lg"
										>
											<route.icon className="mr-3" />
											{route.label}
										</button>
									)
								)}
							</>
						)}
					</div>
					<div className="w-full flex flex-col justify-center space-y-2">
						<Link
							to="/sign-in"
							className="border text-center bg-emerald-600 text-white hover:bg-emerald-500 px-4 py-2.5 rounded-md"
						>
							Sign In
						</Link>
						<Link
							to="/sign-up"
							className="border text-center bg-emerald-600 text-white hover:bg-emerald-500 px-4 py-2.5 rounded-md"
						>
							Sign Up
						</Link>
					</div>
					{/* Mobile Action Items */}
					{currentUser?.role === "buyer" && (
						<div
							className={`${
								!user && "fixed"
							} bottom-0 left-0 w-full bg-white border-t p-4 flex justify-around`}
						>
							<Link to="/dashboard/wishlist" className="relative">
								<Heart className="w-6 h-6" />
								<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
									{wishlistcount || 0}
								</span>
							</Link>
							<Link to="/dashboard/cart" className="relative">
								<ShoppingCart className="w-6 h-6" />
								<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
									{cartCount || 0}
								</span>
							</Link>
						</div>
					)}
				</div>
			)}
		</nav>
	);
};

export default Navbar;
