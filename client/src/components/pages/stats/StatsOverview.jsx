import { useState, useEffect } from "react";
import axios from "../../../../axiosConfig";

import GeneralStats from "./GeneralStats";
import MatchList from "./matches/MatchList";

import CircularProgress from "@mui/material/CircularProgress";
import styles from "./StatsOverview.module.css";

const StatsOverview = ({ playerData }) => {

  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [selectedMode, setSelectedMode] = useState("All");
  const [tiers, setTiers] = useState([]);
  const [gamemodes, setGamemodes] = useState([]);
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
    const fetchTiers = async () => {
      try {
        const tiersResponse = await axios.get(`/valorant/tiers/`);
        setTiers(tiersResponse.data.data);
      } catch (error) {
          console.error("Error fetching tiers", error);
      }
    }
    fetchTiers();
  }, []);

  useEffect(() => {
    const fetchGamemodes = async () => {
      try {
        const gamemodesResponse = await axios.get(`/valorant/gamemodes/`);
        const excludedModes = ["Bot Match", "Basic Training", "Onboarding", "The Range"];
        let playableGamemodes = gamemodesResponse.data.data
          .filter((mode) => !excludedModes.includes(mode.displayName))
          .map((mode) => mode.displayName);

          if (!playableGamemodes.includes("Competitive")) {
            playableGamemodes = ["Competitive", ...playableGamemodes];
          } // Not in Api call for some reason.
        
        setGamemodes(["All", ...playableGamemodes]);
      } catch (error) {
          console.error("Error fetching gamemodes", error);
      }
    }
    fetchGamemodes();
  }, []);

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
            <p>hi</p>
          </div>
          <div className={styles.rightCol}>
            <GeneralStats matches={filteredMatches}/>
            {loading ? (
              <div className={styles.spinner}>
                <CircularProgress />
              </div>
            ) : (
              <MatchList matches={filteredMatches} rankTable={tiers[tiers.length - 1]}/> // Use active competitive rank table
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;