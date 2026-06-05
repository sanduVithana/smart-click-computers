// function Dashboard() {
//   return (
//     <div className="p-10">
//       <h1 className="text-3xl font-bold">
//         Smart Click Admin Dashboard
//       </h1>
//     </div>
//   );
// }

// export default Dashboard;
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, logout } =
    useAuth();

  const navigate =
    useNavigate();

  const handleLogout = () => {
    logout();

    navigate(
      "/admin/login"
    );
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">
        Smart Click Admin Dashboard
      </h1>

      <p>
        Welcome{" "}
        {user?.username}
      </p>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;