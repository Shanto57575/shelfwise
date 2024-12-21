import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import GoogleSignIn from "../components/SocialAuth/GoogleSignIn";

const SignIn = () => {
	const [showPassword, setShowPassword] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { loginUser, loading, setLoading } = useAuth();

	const navigate = useNavigate();

	const onSubmit = (data) => {
		console.log(data);
		loginUser(data.email, data.password)
			.then(() => {
				toast.success(
					<h1 className="font-serif text-center">
						User Signed In Successfully
					</h1>
				);
				navigate("/");
			})
			.catch((error) => {
				const errorMessage = error.message;
				toast.error(<h1 className="font-serif text-center">{errorMessage}</h1>);
				setLoading(false);
			});
	};

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center px-2 md:px-4 py-8">
			<div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
				<div className="p-5 md:p-8">
					<h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
						Sign In
					</h2>
					<form onSubmit={handleSubmit(onSubmit)}>
						{/* Email Input */}
						<div className="relative mb-6">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Mail className="w-5 h-5 text-gray-400" />
							</div>
							<input
								type="email"
								placeholder="Email Address"
								className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								{...register("email", {
									required: "Email is required",
									pattern: {
										value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
										message: "Enter a valid email",
									},
								})}
							/>
							{errors.email && (
								<p className="text-red-500 text-sm">{errors.email.message}</p>
							)}
						</div>

						{/* Password Input */}
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Lock className="w-5 h-5 text-gray-400" />
							</div>
							<input
								type={showPassword ? "text" : "password"}
								placeholder="Password"
								className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								{...register("password", { required: "Password is required" })}
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute inset-y-0 right-0 pr-3 flex items-center"
							>
								{showPassword ? (
									<EyeOff className="w-5 h-5 text-gray-400" />
								) : (
									<Eye className="w-5 h-5 text-gray-400" />
								)}
							</button>
							{errors.password && (
								<p className="text-red-500 text-sm">
									{errors.password.message}
								</p>
							)}
						</div>

						{/* Remember Me and Forgot Password */}
						<div className="flex items-center justify-between mb-5 mt-1 ml-1">
							<a href="#" className="text-sm text-blue-600 hover:text-blue-800">
								Forgot password?
							</a>
						</div>

						{/* Sign In Button */}
						<button
							disabled={loading}
							type="submit"
							className="w-full flex justify-center items-center bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors space-x-2"
						>
							<span>{loading ? <span>loading...</span> : "Sign In"}</span>
							<ArrowRight className="w-5 h-5" />
						</button>
					</form>

					{/* Google Login Button */}
					<GoogleSignIn />

					<div className="mt-6 text-center">
						<p className="text-sm text-gray-600">
							Don&lsquo;t have an account?{" "}
							<Link to="/sign-up" className="text-blue-600 hover:text-blue-800">
								Sign Up
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
