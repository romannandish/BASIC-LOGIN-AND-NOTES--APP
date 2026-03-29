import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);   // 🔥 important
    navigate("/login");
  };

  return (
  <nav className="bg-slate-900 text-white px-6 py-4 shadow-md">
    <div className="max-w-6xl mx-auto flex items-center justify-between">
      
      {/* Logo / Brand */}
      <Link to="/" className="text-xl font-bold text-green-400">
        NotesApp
      </Link>

      {/* Links */}
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="hover:text-green-400 transition"
        >
          Home
        </Link>

        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="hover:text-green-400 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-green-500 hover:bg-green-600 px-4 py-1.5 rounded-lg transition"
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-lg transition"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  </nav>
);
};

export default Navbar;