import "./index.css";
import { Toaster } from "react-hot-toast";
import { router } from "./routes/routes.jsx";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import WishlistProvider from "./cartWishlistProvider/WishlistProvider.jsx";
import CartProvider from "./cartWishlistProvider/CartProvider.jsx";

createRoot(document.getElementById("root")).render(
	<>
		<AuthProvider>
			<CartProvider>
				<WishlistProvider>
					<RouterProvider router={router} />
				</WishlistProvider>
			</CartProvider>
		</AuthProvider>
		<Toaster />
	</>
);
