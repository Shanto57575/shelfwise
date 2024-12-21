import { AlertTriangle } from "lucide-react";

const ErrorPage = () => {
	return (
		<div className="w-full font-serif min-h-screen bg-black flex items-center justify-center px-4 py-12">
			<div className="w-full max-w-xl text-center">
				<div className="flex justify-center mb-6">
					<AlertTriangle className="w-24 h-24 text-red-500" />
				</div>
				<h1 className="text-4xl font-bold text-gray-400 mb-4">
					<span className="font-sans">404 </span>- Page Not Found
				</h1>
				<p className="text-lg text-gray-300 mb-8">
					The page you are looking for might have been removed or is temporarily
					unavailable.
				</p>
				<div className="flex justify-center space-x-4">
					<button
						onClick={() => (window.location.href = "/")}
						className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
					>
						Go to Home
					</button>
					<button
						onClick={() => window.location.reload()}
						className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
					>
						Refresh Page
					</button>
				</div>
			</div>
		</div>
	);
};

export default ErrorPage;
