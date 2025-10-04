import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Expenses from "./pages/Expenses";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthContext";
import { ExpenseProvider } from "./context/ExpenseContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<><Navbar /><Dashboard /></>} />
              <Route path="/employees" element={<><Navbar /><Employees /></>} />
              <Route path="/expenses" element={<><Navbar /><Expenses /></>} />
              <Route path="/profile" element={<><Navbar /><Profile /></>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ExpenseProvider>
    </AuthProvider>
  );
}