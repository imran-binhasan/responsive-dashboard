import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.address?.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    return sortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSortChange = () => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Helmet>
        <title>Users</title>
      </Helmet>
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-700">Users Dashboard</h2>
        <div className="flex justify-between items-center mt-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search users..."
            className="border p-2 rounded-lg w-1/4"
          />
          <button onClick={handleSortChange} className="bg-blue-500 text-white py-2 px-4 rounded-lg">
            Sort by Name ({sortOrder === "asc" ? "Ascending" : "Descending"})
          </button>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full border-collapse">
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
              {sortedUsers.map((user, index) => (
                <tr key={user.id} className="border-t hover:bg-gray-50 transition duration-200">
                  <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                  <td className="py-3 px-4 text-gray-700">{user.name}</td>
                  <td className="py-3 px-4 text-gray-700">{user.email}</td>
                  <td className="py-3 px-4 text-gray-700">
                    {user.address?.city || "-"}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    <Link
                      to={`/dashboard/user/${user.id}`}
                      className="border py-1.5 px-3 bg-blue-500 text-white rounded mr-2"
                    >
                      Details
                    </Link>
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
