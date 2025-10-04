import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center bg-blue-600 text-white p-4">
      <h1 className="font-bold">Expense Manager</h1>
      {user && (
        <div className="flex gap-4">
          <Link to="/">Dashboard</Link>
          {user.role === "ADMIN" && <Link to="/employees">Employees</Link>}
          <Link to="/expenses">Expenses</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}