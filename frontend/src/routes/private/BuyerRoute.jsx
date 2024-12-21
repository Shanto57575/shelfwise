import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useUserData from "../../hooks/useUserData";
import Loader from "../../components/Loader";

const BuyerRoute = ({ children }) => {
	const { user, loading } = useAuth();
	const { role, isLoading: userDataLoading } = useUserData();
	const location = useLocation();

	if (loading || userDataLoading) {
		return <Loader />;
	}

	if (user && role === "buyer") {
		return children;
	}

	return <Navigate to="/sign-in" state={{ from: location }} replace />;
};

export default BuyerRoute;
