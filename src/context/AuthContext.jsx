import { createContext, useContext, useEffect, useState } from "react";

import { getAuthToken } from "../lib/token";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    getApiKey();
  }, []);

  const getApiKey = () => {
    const apiKey = getAuthToken();

    if (apiKey) {
      setIsAuthenticated(true);
    }

    return apiKey;
  };

  const storeApiKeyToLS = (value) => {
    localStorage.setItem("_key", JSON.stringify(value));
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, getApiKey, storeApiKeyToLS }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
