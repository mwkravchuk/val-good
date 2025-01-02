import { useState, useEffect } from "react";
import axios from "../../../../axiosConfig";
import { GlobalData } from "../../../contexts/GlobalDataProvider";

import GeneralStats from "./content/GeneralStats";
import Summary from "./content/Summary";
import MatchList from "./content/MatchList";

import CircularProgress from "@mui/material/CircularProgress";
import styles from "./StatsContent.module.css";

const StatsContent = ({ playerData }) => {

  const { gamemodes } = GlobalData();

  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [numMatches, setNumMatches] = useState(7);
  const [playerMMR, setPlayerMMR] = useState(null);
  const [selectedMode, setSelectedMode] = useState("All");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (playerData) {
      const fetchMatches = async () => {
        setLoading(true);
        try {
          const matchesResponse = await axios.get(`/player/stored-matches/${playerData.puuid}`);
          console.log("Matches: ", matchesResponse.data.data);
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

  useEffect(() => {
    if (playerData) {
      const fetchMatches = async () => {
        setLoading(true);
        try {
          const matchesResponse = await axios.get(`/player/matches/${playerData.puuid}`);
          console.log("Match list: ", matchesResponse.data.data);
        } catch (error) {
            console.error("Error fetching matches", error);
        } finally {
          setLoading(false);
        }
      }
      fetchMatches();
    }
  }, [playerData]);

  const visibleMatches = filteredMatches.slice(0, numMatches);

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
                  borderBottomStyle: "solid",
                  borderBottomWidth: "thick",
                  borderBottomColor: selectedMode === mode ? "hsl(var(--primary-color))" : "hsl(var(--background-color))",
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
            <GeneralStats matches={matches} playerMMR={playerMMR}/>
          </div>
          <div className={styles.rightCol}>
            <Summary matches={visibleMatches}/>
            {loading ? (
              <div className={styles.spinner}>
                <CircularProgress />
              </div>
            ) : (
              <div className={styles.matches}>
                <MatchList matches={visibleMatches}/>
                {numMatches < filteredMatches.length ?
                  <button
                    className={styles.btn}
                    onClick={() => setNumMatches(numMatches + 10)}
                  >
                    Show more
                  </button> : 
                  ""
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsContent;