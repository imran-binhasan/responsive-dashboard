import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { HiOutlineMenuAlt3 } from "react-icons/hi"; // For hamburger icon

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close the sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest("#sidebar") === null && event.target.closest("#hamburger") === null) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />
      {/* Hamburger Button (only visible on mobile) */}
      <button
        id="hamburger"
        className="md:hidden absolute top-4 left-4 z-10 text-gray-600"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <HiOutlineMenuAlt3 size={30} />
      </button>
      {/* Main Content */}
      <div
        className={`flex-1 p-6 bg-gray-100 overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? "ml-0" : " ml-0"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
