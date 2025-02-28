import { createContext, useContext, useState, useEffect } from "react";
import axios from "../../axiosConfig";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/user/current-user", { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.error("User not authenticated", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

  }, []);

  return (
    <UserContext.Provider value={{user, loading}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
