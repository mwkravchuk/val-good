import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../../../axiosConfig";

import StatsHead from "./StatsHead";
import StatsOverview from "./StatsOverview";

const StatsPage = () => {

  const location = useLocation();
  const { username, tagline } = location.state || {};
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    if (username && tagline) {
      const fetchPlayerData = async () => {
        try {
          const response = await axios.get(`/player/puuid?username=${username}&tagline=${tagline}`);
          console.log(response.data.data);
          setPlayerData(response.data.data);
        } catch (error) {
          console.error("Error fetching player data", error);
        }
      };
      fetchPlayerData();
    }
  }, [username, tagline]);

  return (
    <section>
      <StatsHead playerInfo={[username, tagline]} playerData={playerData}/>
      <StatsOverview playerData={playerData}/>
    </section>
  );
}

export default StatsPage;