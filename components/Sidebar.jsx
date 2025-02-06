import { Link } from "react-router-dom";

const Sidebar = ({ isCollapsed }) => {
  return (
    <div className={`h-full ${isCollapsed ? "w-24" : "w-64"} bg-gray-800 text-white p-6`}>
      <nav className="mt-8">
        <ul>
          <li className="mb-4">
            <Link
              to="/users"
              className="flex items-center gap-3 py-2 px-3 text-white hover:bg-gray-700 rounded-md transition"
            >
              {/* Users Icon */}
              {isCollapsed ? (
                <span className="text-xl">👤</span>
              ) : (
                "All Users"
              )}
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/products"
              className="flex items-center gap-3 py-2 px-3 text-white hover:bg-gray-700 rounded-md transition"
            >
              {/* Products Icon */}
              {isCollapsed ? (
                <span className="text-xl">📦</span>
              ) : (
                "Products"
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
