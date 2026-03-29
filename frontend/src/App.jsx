import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {/* Show Navbar only when logged in */}
      {isLoggedIn && <Navbar />}

      <Routes>
        {/* Login */}
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/dashboard" />}
        />

        {/* Register */}
        <Route
          path="/register"
          element={!isLoggedIn ? <Register /> : <Navigate to="/dashboard" />}
        />

        {/* Dashboard (Protected) */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* Default */}
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </>
  );
}

export default App;