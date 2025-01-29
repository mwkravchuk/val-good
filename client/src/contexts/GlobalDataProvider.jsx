import { createContext, useContext, useState, useEffect } from "react";
import { fetchAgents, fetchTiers, fetchGamemodes, fetchMaps, fetchContent } from "../services/globalApi";

const GlobalDataContext = createContext();
export const GlobalData = () => useContext(GlobalDataContext);

export const GlobalDataProvider = ({ children }) => {
  const [agents, setAgents] = useState([]);
  const [tiers, setTiers] = useState([]);
  const [gamemodes, setGamemodes] = useState([]);
  const [maps, setMaps] = useState([]);
  const [content, setContent] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [agentsData, tiersData, gamemodesData, mapsData, contentData] = await Promise.all([
          fetchAgents(),
          fetchTiers(),
          fetchGamemodes(),
          fetchMaps(),
          fetchContent(),
        ]);
        setAgents(agentsData);
        setTiers(tiersData);
        setGamemodes(gamemodesData);
        setMaps(mapsData);
        setContent(contentData);
      } catch (error) {
        console.error("Error loading global data", error);
      }
    };
    loadData();
  }, []);

  return (
    <GlobalDataContext.Provider value={{ agents, tiers, gamemodes, maps, content }}>
      {children}
    </GlobalDataContext.Provider>
  );
};
