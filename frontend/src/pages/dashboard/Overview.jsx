import { User, Mail, Calendar, ShieldCheck, Star, Tag } from "lucide-react";
import useUserData from "../../hooks/useUserData";

const formatDate = (dateString) => {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};

const Overview = () => {
	const data = useUserData();

	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
				<div className="bg-gradient-to-r from-emerald-500 to-green-600 p-6">
					<h1 className="text-3xl font-bold text-white flex items-center">
						<User className="mr-4 text-white" size={32} />
						User Profile Overview
					</h1>
				</div>

				<div className="p-8 grid md:grid-cols-2 gap-6">
					<div className="space-y-4">
						<ProfileItem
							icon={<User className="text-blue-500" />}
							label="Name"
							value={data.name}
						/>
						<ProfileItem
							icon={<Mail className="text-green-500" />}
							label="Email"
							value={data.email}
						/>
						<ProfileItem
							icon={<Tag className="text-purple-500" />}
							label="Role"
							value={data.role?.charAt(0).toUpperCase() + data.role?.slice(1)}
						/>
					</div>

					<div className="space-y-4">
						<ProfileItem
							icon={<ShieldCheck className="text-emerald-500" />}
							label="Status"
							value={
								data.status?.charAt(0).toUpperCase() + data.status?.slice(1)
							}
						/>
						<ProfileItem
							icon={<Calendar className="text-red-500" />}
							label="Created At"
							value={formatDate(data.createdAt)}
						/>
						<ProfileItem
							icon={<Star className="text-yellow-500" />}
							label="Wishlist Items"
							value={data.wishlist?.length}
						/>
					</div>
				</div>

				<div className="bg-gray-50 p-6 text-center">
					<p className="text-sm text-gray-900 font-sans font-semibold">
						User ID: {data._id?.slice(0, 4)}...{data._id?.slice(20, 24)}
					</p>
				</div>
			</div>
		</div>
	);
};

// Reusable Profile Item Component
const ProfileItem = ({ icon, label, value }) => (
	<div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center shadow-sm hover:shadow-md transition-all duration-300">
		<div className="mr-4">{icon}</div>
		<div>
			<p className="text-sm text-gray-500 font-medium">{label}</p>
			<p className="text-lg font-semibold text-gray-800">{value}</p>
		</div>
	</div>
);

export default Overview;
