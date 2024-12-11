import { createContext, useContext, useState, useEffect } from "react";
import { fetchAgents, fetchTiers, fetchGamemodes } from "../services/globalApi";

const GlobalDataContext = createContext();
export const GlobalData = () => useContext(GlobalDataContext);

export const GlobalDataProvider = ({ children }) => {
  const [agents, setAgents] = useState([]);
  const [tiers, setTiers] = useState([]);
  const [gamemodes, setGamemodes] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [agentsData, tiersData, gamemodesData] = await Promise.all([
          fetchAgents(),
          fetchTiers(),
          fetchGamemodes(),
        ]);
        setAgents(agentsData);
        setTiers(tiersData);
        setGamemodes(gamemodesData);
      } catch (error) {
        console.error("Error loading global data", error);
      }
    };
    loadData();
  }, []);

  return (
    <GlobalDataContext.Provider value={{ agents, tiers, gamemodes }}>
      {children}
    </GlobalDataContext.Provider>
  );
};
