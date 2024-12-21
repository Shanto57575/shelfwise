import { CircleUserRound, LayoutDashboard, LogOut } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Dropdown = () => {
	// Correctly use the auth hook
	const { user, logoutUser } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logoutUser();
		toast.success(
			<h1 className="font-serif text-center">Logged Out Successfully</h1>
		);
		navigate("/");
	};

	return (
		<div className="dropdown dropdown-end">
			<div
				tabIndex={0}
				role="button"
				className="btn btn-ghost btn-circle avatar flex items-center"
			>
				{user?.photoURL ? (
					<div className="w-10 rounded-full">
						<img alt={user.displayName || "User"} src={user.photoURL} />
					</div>
				) : (
					<CircleUserRound className="w-6 h-6" />
				)}
			</div>
			<ul
				tabIndex={0}
				className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
			>
				<li>
					<Link to="/">
						<CircleUserRound className="w-5 h-5" />
						<span className="text-black">{user?.displayName || "Profile"}</span>
					</Link>
				</li>
				<li>
					<Link to="/dashboard">
						<LayoutDashboard className="w-5 h-5" />
						<span className="text-black">Dashboard</span>
					</Link>
				</li>
				<li>
					<a onClick={handleLogout}>
						<LogOut className="w-5 h-5" />
						Sign Out
					</a>
				</li>
			</ul>
		</div>
	);
};

export default Dropdown;
