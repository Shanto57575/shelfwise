import { useEffect, useState } from "react";
import API_BASE_URL from "../axios/axios";
import useAuth from "./useAuth";

const useUserData = () => {
	const { user } = useAuth();
	const [userData, setUserData] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const token = localStorage.getItem("access-token");

	useEffect(() => {
		const fetchUserData = async () => {
			if (user?.email) {
				try {
					const res = await API_BASE_URL.get(
						`/api/user/get-user/${user.email}`,
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
					setUserData(res.data);
				} catch (error) {
					console.error("Error fetching user data:", error);
				} finally {
					setIsLoading(false);
				}
			} else {
				setIsLoading(false);
			}
		};

		fetchUserData();
	}, [user]);

	return { ...userData, isLoading };
};

export default useUserData;
