import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlinePlayLesson } from "react-icons/md";
import { GrUserManager } from "react-icons/gr";

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Sidebar collapse state

  // Handle sidebar toggle on mobile
  const handleSidebarToggle = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <div
        className={`sidebar fixed inset-y-0 left-0 z-50 transform transition-all duration-300 ${
          isSidebarCollapsed ? "w-16" : "w-64"
        } bg-gray-800 text-white p-6 shadow-lg md:relative md:w-64 md:p-6`}
      >
        <div className="flex justify-between items-center">
          {/* Sidebar Title (Only on large screens) */}
          <h2
            className={`text-2xl font-bold ${isSidebarCollapsed ? "hidden" : "block"}`}
          >
            Dashboard
          </h2>
          {/* Arrow icon to toggle sidebar on small screens */}
          <button
            onClick={handleSidebarToggle}
            className="text-2xl text-gray-300 hover:text-white md:hidden"
          >
            {isSidebarCollapsed ? <FaArrowRight /> : <FaArrowLeft />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-8">
          <ul>
            <li className="mb-4">
              <Link
                to="/home"
                className="flex items-center py-2 px-3 text-white hover:bg-gray-700 rounded-md transition"
              >
                <IoHomeOutline className="text-xl md:hidden" /> {/* Show icon on small screens */}
                <span className="hidden md:inline-block ml-2">Home</span> {/* Show text on large screens */}
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/users"
                className="flex items-center py-2 px-3 text-white hover:bg-gray-700 rounded-md transition"
              >
                <GrUserManager className="text-xl md:hidden" /> {/* Show icon on small screens */}
                <span className="hidden md:inline-block ml-2">Users</span> {/* Show text on large screens */}
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/products"
                className="flex items-center py-2 px-3 text-white hover:bg-gray-700 rounded-md transition"
              >
                <MdOutlinePlayLesson className="text-xl md:hidden" /> {/* Show icon on small screens */}
                <span className="hidden md:inline-block ml-2">Products</span> {/* Show text on large screens */}
              </Link>
            </li>
            {/* Add other links here as necessary */}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 p-6 bg-gray-100 overflow-y-auto transition-all duration-300 ${
          isSidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
