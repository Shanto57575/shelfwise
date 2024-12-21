import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import GoogleSignIn from "../components/SocialAuth/GoogleSignIn";
import API_BASE_URL from "../axios/axios";

const SignUp = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();
	const { createUser, loading, setLoading } = useAuth();

	const navigate = useNavigate();

	const onSubmit = async (data) => {
		try {
			const userData = {
				name: data.fullName,
				email: data.email,
				password: data.password,
				role: data.role,
				status: data.role === "seller" ? "pending" : "active",
				wishlist: [],
			};

			const userCredential = await createUser(data.email, data.password);
			const user = userCredential.user;

			await updateProfile(user, {
				displayName: data.fullName,
				photoURL:
					"https://t4.ftcdn.net/jpg/04/31/64/75/240_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg",
			});

			const response = await API_BASE_URL.post("/api/user/create-user", {
				userData,
			});
			console.log(response);

			toast.success(
				<h1 className="font-serif text-center">User Signed Up Successfully</h1>
			);
			navigate("/");
		} catch (error) {
			const errorMessage = error.message;
			toast.error(<h1 className="font-serif text-center">{errorMessage}</h1>);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
			<div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6">
				<h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
					Create Account
				</h2>
				<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
					{/* Full Name Field */}
					<div>
						<input
							type="text"
							placeholder="Full Name"
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							{...register("fullName", { required: "Full name is required" })}
						/>
						{errors.fullName && (
							<p className="text-red-500 text-xs mt-1">
								{errors.fullName.message}
							</p>
						)}
					</div>

					{/* Email Field */}
					<div>
						<input
							type="email"
							placeholder="Email Address"
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							{...register("email", {
								required: "Email is required",
								pattern: {
									value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
									message: "Enter a valid email",
								},
							})}
						/>
						{errors.email && (
							<p className="text-red-500 text-xs mt-1">
								{errors.email.message}
							</p>
						)}
					</div>

					{/* Password Field */}
					<div>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								placeholder="Create Password"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								{...register("password", {
									required: "Password is required",
									minLength: {
										value: 8,
										message: "Password must be at least 8 characters",
									},
									pattern: {
										value:
											/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
										message:
											"Password must include uppercase, lowercase, number, and special character",
									},
								})}
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
						</div>
						{errors.password && (
							<p className="text-red-500 text-xs mt-1">
								{errors.password.message}
							</p>
						)}
					</div>

					{/* Confirm Password Field */}
					<div>
						<div className="relative">
							<input
								type={showConfirmPassword ? "text" : "password"}
								placeholder="Confirm Password"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								{...register("confirmPassword", {
									required: "Confirm Password is required",
									validate: (value) =>
										value === watch("password") || "Passwords do not match",
								})}
							/>
							<button
								type="button"
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								className="absolute inset-y-0 right-0 pr-3 flex items-center"
							>
								{showConfirmPassword ? (
									<EyeOff className="w-5 h-5 text-gray-400" />
								) : (
									<Eye className="w-5 h-5 text-gray-400" />
								)}
							</button>
						</div>
						{errors.confirmPassword && (
							<p className="text-red-500 text-xs mt-1">
								{errors.confirmPassword.message}
							</p>
						)}
					</div>

					{/* Role Field */}
					<div>
						<select
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							{...register("role", {
								required: "Role is required",
							})}
						>
							<option value="" disabled selected>
								Select a role
							</option>
							<option value="buyer">Buyer</option>
							<option value="seller">Seller</option>
						</select>
						{errors.role && (
							<p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
						)}
					</div>

					{/* Submit Button */}
					<button
						disabled={loading}
						type="submit"
						className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
					>
						{loading ? "Loading..." : "Sign Up"}
					</button>

					{/* Social Sign-In */}
					<GoogleSignIn />
				</form>
				<div className="mt-4 text-center">
					<p className="text-sm text-gray-600">
						Already have an account?{" "}
						<Link to="/sign-in" className="text-blue-600 hover:text-blue-800">
							Sign In
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
