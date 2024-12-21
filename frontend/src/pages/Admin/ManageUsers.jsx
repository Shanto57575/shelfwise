import { useEffect, useState } from "react";
import API_BASE_URL from "../../axios/axios";
import { CircleUserRound, X } from "lucide-react";
import toast from "react-hot-toast";

const ManageUsers = () => {
	const [allUsers, setAllUsers] = useState([]);
	const token = localStorage.getItem("access-token");

	const fetchAllUsers = async () => {
		const response = await API_BASE_URL("/api/user/all-users", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (response.data) {
			console.log(response.data);
			setAllUsers(response.data);
		}
	};

	useEffect(() => {
		fetchAllUsers();
	}, []);

	const handleStatus = async (userId, status) => {
		try {
			const response = await API_BASE_URL.put(
				`/api/user/${userId}`,
				{
					status,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response.data) {
				toast.success(
					<h1 className="text-center font-serif">
						User status updated successfully
					</h1>
				);
				fetchAllUsers();
			}
		} catch (error) {
			console.log(error);
			toast.error("Error updating user status");
		}
	};

	const handleRoleChange = async (userId, role) => {
		try {
			const response = await API_BASE_URL.put(
				`/api/user/${userId}`,
				{
					role,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response.data) {
				toast.success(
					<h1 className="text-center font-serif">
						User role updated successfully
					</h1>
				);
				fetchAllUsers();
			}
		} catch (error) {
			console.log(error);
			toast.error("Error updating user role");
		}
	};

	const handleDelete = async (userId) => {
		try {
			const response = await API_BASE_URL.delete(`/api/user/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.data) {
				toast.success("User deleted successfully");
				fetchAllUsers();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container mx-auto p-4">
			<div className="mb-4">
				<h1 className="text-xl font-semibold">Manage Users</h1>
				<p className="text-3xl text-gray-900 text-center mt-6">
					Total User : {allUsers.length}
				</p>
			</div>

			<div className="overflow-x-auto">
				<table className="table-auto text-center w-full text-sm border-collapse">
					{/* Table Head */}
					<thead className="bg-gray-100 text-gray-700">
						<tr>
							<th className="px-4 py-2">Name</th>
							<th className="px-4 py-2">Email</th>
							<th className="px-4 py-2">Role</th>
							<th className="px-4 py-2">Status</th>
							<th className="px-4 py-2">Remove</th>
						</tr>
					</thead>
					{/* Table Body */}
					<tbody>
						{allUsers.map((user) => (
							<tr key={user._id} className="border-t hover:bg-gray-50">
								<td className="px-4 py-2">
									<div className="flex items-center gap-3">
										<div className="avatar">
											<div className="mask mask-squircle h-12 w-12">
												<CircleUserRound className="w-full h-full" />
											</div>
										</div>
										<div>
											<div className="font-medium">{user?.name}</div>
										</div>
									</div>
								</td>
								<td className="px-4 py-2 text-sm text-gray-700">
									{user?.email}
								</td>
								<td className="px-4 py-2">
									<select
										defaultValue={user?.role}
										onChange={(e) => handleRoleChange(user._id, e.target.value)}
										className="bg-blue-500 text-gray-800 uppercase px-3 py-2 rounded cursor-pointer"
									>
										<option value="buyer">buyer</option>
										<option value="seller">seller</option>
									</select>
								</td>

								<td className="px-4 py-2">
									{user?.status == "active" ? (
										<button
											disabled
											className="bg-emerald-500 text-emerald-950 px-5 py-1.5 rounded cursor-not-allowed"
										>
											{user?.status}
										</button>
									) : (
										<button
											onClick={() => handleStatus(user._id, "active")}
											className="bg-red-500 text-red-950 px-5 py-1.5 rounded"
										>
											{user?.status}
										</button>
									)}
								</td>
								<td
									onClick={() => handleDelete(user._id)}
									className="text-center cursor-pointer pl-14 text-red-600"
								>
									<X />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ManageUsers;
