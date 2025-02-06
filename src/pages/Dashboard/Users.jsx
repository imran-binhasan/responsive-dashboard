import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => setUsers(res.data))
            .catch(error => console.error("Error fetching users:", error));
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-700">Users Dashboard</h2>
                <table className="min-w-full mt-4 border-collapse">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="py-3 px-4 text-left">#</th>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">City</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user, index) => (
                            <tr key={user.id} className="border-t hover:bg-gray-50 transition duration-200">
                                <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                                <td className="py-3 px-4 text-gray-700">{user.name}</td>
                                <td className="py-3 px-4 text-gray-700">{user.email}</td>
                                <td className="py-3 px-4 text-gray-700">{user.address?.city || '-'}</td>
                                <td className="py-3 px-4 text-gray-700">
                                    <Link 
                                        to={`/dashboard/user/${user.id}`} 
                                        className="border py-1.5 px-3 bg-blue-500 text-white rounded mr-2"
                                    >
                                        Details
                                    </Link>
                                    <button
                                        className="border py-1.5 px-3 bg-red-500 text-white rounded"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
