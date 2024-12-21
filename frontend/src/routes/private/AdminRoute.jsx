import { Navigate, useLocation } from "react-router-dom";
import Loader from "../../components/Loader";
import useUserData from "../../hooks/useUserData";
import useAuth from "../../hooks/useAuth";

const AdminRoute = ({ children }) => {
	const { user, loading } = useAuth();
	const { role, isLoading: userDataLoading } = useUserData();
	const location = useLocation();

	if (loading || userDataLoading) {
		return <Loader />;
	}

	if (user && role === "admin") {
		return children;
	}

	return <Navigate to="/sign-in" state={{ from: location }} replace />;
};

export default AdminRoute;
