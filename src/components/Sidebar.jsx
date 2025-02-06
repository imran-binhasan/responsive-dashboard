import { Link } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  return (
    <div
      id="sidebar"
      className={`h-full bg-gray-800 text-white p-6 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 fixed md:relative top-0 left-0 bottom-0 md:w-64 w-48`}
    >
      <nav className="mt-8">
        <ul>
          <li className="mb-4">
            <Link
              to="/dashboard/users"
              className="flex items-center gap-3 py-2 px-3 text-white hover:bg-gray-700 rounded-md transition"
            >
              All Users
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/dashboard/products"
              className="flex items-center gap-3 py-2 px-3 text-white hover:bg-gray-700 rounded-md transition"
            >
              Products
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/"
              className="flex items-center gap-3 py-2 px-3 text-white hover:bg-gray-700 rounded-md transition"
            >
              Home
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
