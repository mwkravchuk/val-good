import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import MatchList from './MatchList';
import axios from "../../axiosConfig";

const StatsPage = () => {

  const location = useLocation();
  const { username, tagline } = location.state || {};

  const [playerData, setPlayerData] = useState(null);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (username && tagline) {
      const fetchPlayerData = async () => {
        try {
          const response = await axios.get(`/player/puuid?username=${username}&tagline=${tagline}`);
          setPlayerData(response.data.data);
        } catch (error) {
          console.error("Error fetching player data", error);
        }
      };
      fetchPlayerData();
    }
  }, [username, tagline]);

  useEffect(() => {
    if (playerData) {
      const fetchMatches = async () => {
        try {
          const matchesResponse = await axios.get(`/player/matches/${playerData.puuid}`);
          setMatches(matchesResponse.data.data);
        } catch (error) {
            console.error("Error fetching matches", error);
        }
      }
      fetchMatches();
    }
  }, [playerData]);

  return (
    <>
      <div>
        <h1>Stats Page</h1>
        <p>{username}</p>
        <p>{tagline}</p>
        <MatchList matches={matches}/>
      </div>
    </>
  );
}

export default StatsPage;