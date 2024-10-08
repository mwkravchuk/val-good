import { useState, useEffect } from "react";
import axios from "../../../../axiosConfig";

import GeneralStats from "./GeneralStats";
import MatchList from "./matches/MatchList";

import CircularProgress from "@mui/material/CircularProgress";
import styles from "./StatsOverview.module.css";

const StatsOverview = ({ playerData }) => {

  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [selectedMode, setSelectedMode] = useState("all");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (playerData) {
      const fetchMatches = async () => {
        setLoading(true);
        try {
          const matchesResponse = await axios.get(`/player/stored-matches/${playerData.puuid}`);
          console.log(matchesResponse);
          setMatches(matchesResponse.data.data);
        } catch (error) {
            console.error("Error fetching matches", error);
        } finally {
          setLoading(false);
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
    <div className={styles.overviewContainer}>
      <div className={styles.overview}>
        <div className={styles.cols}>
          <div className={styles.leftCol}>
            <p>hi</p>
          </div>
          <div className={styles.rightCol}>
            <GeneralStats />
            {loading ? (
              <div className={styles.spinner}>
                <CircularProgress />
              </div>
            ) : (
              <MatchList matches={filteredMatches}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;