import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-5">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <nav className="mt-5">
        <ul>
          <li className="mb-3">
            <Link to="/users" className="hover:underline">
              All Users
            </Link>
          </li>
          <li>
            <Link to="/products" className="hover:underline">
              Products
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
