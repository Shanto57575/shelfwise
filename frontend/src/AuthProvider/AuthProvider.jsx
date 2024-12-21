import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	signInWithPopup,
	GoogleAuthProvider,
	onAuthStateChanged,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { createContext, useEffect } from "react";
import { useState } from "react";
import API_BASE_URL from "../axios/axios";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const googleProvider = new GoogleAuthProvider();

	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const loginUser = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logoutUser = () => {
		localStorage.removeItem("access-token");
		setUser(null);
		return signOut(auth);
	};

	const googleLogin = () => {
		setLoading(true);
		return signInWithPopup(auth, googleProvider);
	};

	const handleAuthState = async (currentUser) => {
		if (currentUser) {
			try {
				const data = await API_BASE_URL.post("/api/auth/authetication", {
					email: currentUser.email,
				});
				if (data && data.data) {
					localStorage.setItem("access-token", data.data.token);
					setUser(currentUser);
				}
			} catch (error) {
				console.error("Error in API call:", error);
			}
		} else {
			localStorage.removeItem("access-token");
			setUser(null);
		}
		setLoading(false);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			handleAuthState(currentUser);
		});
		return () => unsubscribe();
	}, []);

	const authInfo = {
		user,
		loading,
		createUser,
		loginUser,
		logoutUser,
		googleLogin,
		setLoading,
	};

	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
