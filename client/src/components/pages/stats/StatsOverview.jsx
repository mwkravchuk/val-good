import { useState, useEffect } from "react";
import axios from "../../../../axiosConfig";
import { GlobalData } from "../../../contexts/GlobalDataProvider";

import GeneralStats from "./general/GeneralStats";
import Summary from "./Summary";
import MatchList from "./matches/MatchList";

import CircularProgress from "@mui/material/CircularProgress";
import styles from "./StatsOverview.module.css";

const StatsOverview = ({ playerData }) => {

  const { gamemodes } = GlobalData();

  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [playerMMR, setPlayerMMR] = useState(null);
  const [selectedMode, setSelectedMode] = useState("All");
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
    if (selectedMode == "All") {
      setFilteredMatches(matches);
    } else {
      setFilteredMatches(matches.filter((match) => match.meta.mode === selectedMode));
    }
  }, [selectedMode, matches]);

  useEffect(() => {
    if (playerData) {
      const fetchMMR = async () => {
        try {
          const mmrResponse = await axios.get(`/player/mmr/${playerData.puuid}`);
          console.log("Player MMR: ", mmrResponse.data.data);
          setPlayerMMR(mmrResponse.data.data);
        } catch (error) {
          console.error("Error fetching player MMR", error);
        }
      };
      fetchMMR();
    }
  }, [playerData]);

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.overview}>
        <div className={styles.modesContainer}>
          <div className={styles.modes}>
            {gamemodes.map((mode) => (
              <button
                key={mode}
                onClick={() => setSelectedMode(mode)}
                className={styles.modeBtn}
                style={{
                  backgroundColor: selectedMode === mode ? "var(--primary-color)" : "var(--background-color)",
                  fontWeight: selectedMode === mode ? "700" : "500",
                }}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.cols}>
          <div className={styles.leftCol}>
            <GeneralStats playerMMR={playerMMR}/>
          </div>
          <div className={styles.rightCol}>
            <Summary matches={filteredMatches}/>
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