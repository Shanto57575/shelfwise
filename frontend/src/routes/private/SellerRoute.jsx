import Loader from "../../components/Loader";
import useAuth from "../../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import useUserData from "../../hooks/useUserData";

const SellerRoute = ({ children }) => {
	const { user, loading } = useAuth();
	const { role, isLoading: userDataLoading } = useUserData();
	const location = useLocation();

	if (loading || userDataLoading) {
		return <Loader />;
	}

	if (user && role === "seller") {
		return children;
	}

	return <Navigate to="/sign-in" state={{ from: location }} replace />;
};

export default SellerRoute;
