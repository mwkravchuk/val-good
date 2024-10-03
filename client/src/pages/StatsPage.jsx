import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import MatchList from './MatchList';
import axios from "../../axiosConfig";

const StatsPage = () => {

  const location = useLocation();
  const { username, tagline } = location.state || {};
  const [playerData, setPlayerData] = useState(null);

  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [selectedMode, setSelectedMode] = useState("all");

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

  useEffect(() => {
    if (playerData) {
      const fetchMatches = async () => {
        try {
          const matchesResponse = await axios.get(`/player/stored-matches/${playerData.puuid}`);
          console.log(matchesResponse);
          setMatches(matchesResponse.data.data);
        } catch (error) {
            console.error("Error fetching matches", error);
        }
      }
      fetchMatches();
    }
  }, [playerData]);

  useEffect(() => {
    if (selectedMode === "all") {
      setFilteredMatches(matches);
    } else {
      const filteredMatches = matches.filter((match) => match.meta.mode.toLowerCase() === selectedMode);
      setFilteredMatches(filteredMatches);
    }
  }, [selectedMode, matches]);

  return (
    <>
      <div>
        <h1>Stats Page</h1>
        <p>{username}</p>
        <p>{tagline}</p>
        <select name="modes" id="modes" onChange={(e) => setSelectedMode(e.target.value)}>
          <option value="all">All</option>
          <option value="competitive">Competitive</option>
          <option value="unrated">Unrated</option>
          <option value="deathmatch">Deathmatch</option>
          <option value="teamdeathmatch">Team Deathmatch</option>
          <option value="swiftplay">Swiftplay</option>
          <option value="spikerush">Spike Rush</option>
        </select>
        <MatchList matches={filteredMatches}/>
      </div>
    </>
  );
}

export default StatsPage;