import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, AuthContextType } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: any[] = [];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const API_BASE_URL = import.meta.env.PROD
        ? "/api"
        : "http://localhost:8000/api";
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const existingUser = mockUsers.find(
          (u) => u.email === email && u.password === password
        );
        if (existingUser) {
          const token = "mock-jwt-token-" + Date.now();
          localStorage.setItem("authToken", token);
          localStorage.setItem("userData", JSON.stringify(existingUser));
          setUser(existingUser);
          return;
        }
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      setUser(data.user);
    } catch (error: any) {
      const existingUser = mockUsers.find((u) => u.email === email);
      if (existingUser && existingUser.password === password) {
        const token = "mock-jwt-token-" + Date.now();
        localStorage.setItem("authToken", token);
        localStorage.setItem("userData", JSON.stringify(existingUser));
        setUser(existingUser);
        return;
      }
      throw new Error(error.message || "Login failed");
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const API_BASE_URL = import.meta.env.PROD
        ? "/api"
        : "http://localhost:8000/api";
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        const newUser = {
          id: Date.now().toString(),
          email,
          name,
          password,
          plan: "free" as const,
          createdAt: new Date(),
          subscriptionEnd: null,
        };

        mockUsers.push(newUser);
        const token = "mock-jwt-token-" + Date.now();
        localStorage.setItem("authToken", token);
        localStorage.setItem("userData", JSON.stringify(newUser));
        setUser(newUser);
        return;
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      setUser(data.user);
    } catch (error: any) {
      const newUser = {
        id: Date.now().toString(),
        email,
        name,
        password,
        plan: "free" as const,
        createdAt: new Date(),
        subscriptionEnd: null,
      };

      mockUsers.push(newUser);
      const token = "mock-jwt-token-" + Date.now();
      localStorage.setItem("authToken", token);
      localStorage.setItem("userData", JSON.stringify(newUser));
      setUser(newUser);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
