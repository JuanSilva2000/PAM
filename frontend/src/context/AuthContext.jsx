import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log(context)
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [error]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        Cookies.set('token', res.data.token);
        localStorage.setItem('token', res.data.token);
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      //console.log(error);
      setError(error.response.data.message);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      Cookies.set('token', res.data.token);
      localStorage.setItem('token', res.data.token);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      //const cookies = Cookies.get();
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const res = await verifyTokenRequest(token);
        //console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
    //console.log('after');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
        isAuthenticated,
        error,
        //errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};