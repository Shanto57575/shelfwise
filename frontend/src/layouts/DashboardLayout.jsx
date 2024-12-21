import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/dashboard/Sidebar";

// Main Dashboard Layout
const DashboardLayout = () => {
	const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

	const toggleMobileSidebar = () => {
		setIsMobileSidebarOpen(!isMobileSidebarOpen);
	};

	return (
		<div className="flex h-screen overflow-hidden font-serif">
			{/* Mobile Sidebar Toggle */}
			<button
				className="fixed top-4 left-4 z-50 md:hidden"
				onClick={toggleMobileSidebar}
			>
				{isMobileSidebarOpen ? (
					<X className="text-gray-800" />
				) : (
					<Menu className="text-gray-800" />
				)}
			</button>

			{/* Sidebar - Desktop and Mobile */}
			<div
				className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-blue-50 to-blue-100 
          transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0
          ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
			>
				<Sidebar closeMobileSidebar={() => setIsMobileSidebarOpen(false)} />
			</div>

			{/* Main Content Area */}
			<main
				className="flex-1 overflow-y-auto bg-gray-50 transition-all duration-300 md:ml-0 ${isMobileSidebarOpen ? 'md:ml-64' : 'ml-0'}"
				onClick={() => setIsMobileSidebarOpen(false)}
			>
				<div className="p-6 max-w-7xl mx-auto">
					<Outlet />
				</div>
			</main>
		</div>
	);
};

export default DashboardLayout;
