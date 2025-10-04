import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = ({ email }) => {
    // Dummy role assignment: admin if email includes "admin"
    if (email.includes("admin")) {
      setUser({ id: 1, name: "Admin User", role: "ADMIN" });
    } else {
      setUser({ id: 2, name: "Employee User", role: "EMPLOYEE" });
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);