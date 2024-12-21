import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/Products";
import ErrorPage from "../pages/ErrorPage";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./private/PrivateRoute";
import Overview from "../pages/dashboard/Overview";
import MyProducts from "../pages/seller/MyProducts";
import SellerRoute from "./private/SellerRoute";
import AddProduct from "../pages/seller/AddProduct";
import BuyerRoute from "./private/BuyerRoute";
import MyWishList from "../pages/buyer/MyWishList";
import ViewDetails from "../pages/ViewDetails";
import MyCart from "../pages/MyCart";
import AdminRoute from "./private/AdminRoute";
import ManageUsers from "../pages/Admin/ManageUsers";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/about",
				element: <About />,
			},
			{
				path: "/products",
				element: <Products />,
			},
			{
				path: "/view-details/:bookId",
				element: <ViewDetails />,
			},
			{
				path: "/sign-in",
				element: <SignIn />,
			},
			{
				path: "/sign-up",
				element: <SignUp />,
			},
		],
	},
	{
		path: "/dashboard",
		element: (
			<PrivateRoute>
				<DashboardLayout />
			</PrivateRoute>
		),
		children: [
			{
				path: "overview",
				element: <Overview />,
			},
			// Admin routes
			{
				path: "manage-users",
				element: (
					<AdminRoute>
						<ManageUsers />
					</AdminRoute>
				),
			},
			// Buyer routes
			{
				path: "wishlist",
				element: (
					<BuyerRoute>
						<MyWishList />
					</BuyerRoute>
				),
			},
			{
				path: "cart",
				element: (
					<BuyerRoute>
						<MyCart />
					</BuyerRoute>
				),
			},
			// seller routes
			{
				path: "my-books",
				element: (
					<SellerRoute>
						<MyProducts />
					</SellerRoute>
				),
			},
			{
				path: "add-product",
				element: (
					<SellerRoute>
						<AddProduct />
					</SellerRoute>
				),
			},
		],
	},
]);
