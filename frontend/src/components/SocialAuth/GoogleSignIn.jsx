import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import google from "../../assets/google.png";

const GoogleSignIn = () => {
	const { loading, setLoading, googleLogin } = useAuth();

	const navigate = useNavigate();

	const handleGoogleLogin = () => {
		googleLogin()
			.then(() => {
				toast.success(
					<h1 className="font-serif text-center">
						Signed in with Google Successfully
					</h1>
				);
				navigate("/");
			})
			.catch((error) => {
				const errorMessage = error.message;
				console.log(errorMessage);
				setLoading(false);
				toast.error(<h1 className="font-serif text-center">{errorMessage}</h1>);
			});
	};

	return (
		<div className="mt-6">
			<button
				disabled={loading}
				onClick={handleGoogleLogin}
				className="w-full flex justify-center items-center border border-gray-300 p-4 rounded-lg bg-black text-white duration-300 hover:bg-gray-900 transition-colors space-x-2"
			>
				<img src={google} className="w-5 h-5" alt="" />
				<span>{loading ? "loading..." : "Sign In with Google"}</span>
			</button>
		</div>
	);
};

export default GoogleSignIn;
