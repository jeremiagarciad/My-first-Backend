import { createContext, useContext, useEffect, useState } from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
} from "./../api/auth";
import Cookies from "js-cookie";
import { useMemo } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(true);

  const signUp = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setError(error.response.data);
    }
  };

  const signIn = useMemo(
    () => async (user) => {
      try {
        const res = await loginRequest(user);
        setUser(res.data);
        setIsAuthenticated(true);
      } catch (error) {
        if (Array.isArray(error.response.data)) {
          return setError(error.response.data);
        }
        setError([error.response.data.message]);
      }
    },
    []
  );

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };
  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);

        if (!res.data) {
          setIsAuthenticated(false);
        }

        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        user,
        isAuthenticated,
        error,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthContext");
  }
  return context;
};
