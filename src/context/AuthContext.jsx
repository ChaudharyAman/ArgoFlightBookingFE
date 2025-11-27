import { createContext, useEffect, useState } from "react";
import { getMe } from "../api/auth";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const { data } = await getMe();
      setUser(data);
    } catch (error) {
      console.error("Auth load error:", error);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const { data } = await getMe();
      setUser(data);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, refreshUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
