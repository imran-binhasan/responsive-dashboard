import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Home = () => {
  const { user, logoutUser } = useContext(AuthContext);
  console.log(user);
  return (
    <>
      <div className="text-center pt-6 mt-10 pb-2">
        <h1 className="text-2xl font-medium">Welcome to the Application</h1>
      </div>
      <div className="flex justify-center gap-6 p-3 ">
        {user?.email ? (
          <>
            <p>{user.name}</p>
            <button
              onClick={logoutUser}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              className="py-1 border border-gray-600 rounded-md px-4 font-medium"
              to="/login"
            >
              Login
            </NavLink>
          </>
        )}
        <NavLink
          className="py-1 border border-gray-600 rounded-md px-4 font-medium"
          to="/dashboard/users"
        >
          Dashboard
        </NavLink>
      </div>
    </>
  );
};

export default Home;
