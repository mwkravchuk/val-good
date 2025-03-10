import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
//import { useUser } from "../../contexts/UserProvider";
import axios from "../../../axiosConfig";

import StatsHead from "./stats/StatsHead";
import StatsContent from "./stats/StatsContent";

const StatsPage = () => {

  const location = useLocation();
  const { username: generalUsername, tagline: generalTagline } = location.state || {};
  //const { user, loading } = useUser();
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    //if (loading) return;
    const usernameToFetch = generalUsername;
    const taglineToFetch = generalTagline;

    //console.log("usernametofetch: ", usernameToFetch);

    if (usernameToFetch && taglineToFetch) {
      const fetchPlayerData = async () => {
        try {
          const response = await axios.get(`/player/puuid?username=${usernameToFetch}&tagline=${taglineToFetch}`);
          console.log(response.data.data);
          setPlayerData(response.data.data);
        } catch (error) {
          console.error("Error fetching player data", error);
        }
      };
      fetchPlayerData();
    }

  }, [generalUsername, generalTagline]);

  //if (loading) return <p>loading...</p>;
  //if (!user && !generalUsername) return <p>please log in or enter riot id</p>

  return (
    <section>
      <StatsHead playerInfo={[generalUsername, generalTagline]} playerData={playerData}/>
      <StatsContent playerInfo={[generalUsername, generalTagline]} playerData={playerData}/>
    </section>
  );
}

export default StatsPage;