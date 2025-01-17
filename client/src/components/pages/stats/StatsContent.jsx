import { useState, useEffect } from "react";
import axios from "../../../../axiosConfig";
import { GlobalData } from "../../../contexts/GlobalDataProvider";

import Skeleton from "@mui/material/Skeleton";

import GamemodeSelector from "./content/GamemodeSelector";
import GeneralStats from "./content/GeneralStats";
import Summary from "./content/Summary";
import MatchList from "./content/MatchList";

import styles from "./StatsContent.module.css";

const StatsContent = ({ playerData }) => {

  const { gamemodes } = GlobalData();

  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [numMatches, setNumMatches] = useState(7);
  const [playerMMR, setPlayerMMR] = useState(null);
  const [selectedMode, setSelectedMode] = useState("All");
  const [loadingMatches, setLoadingMatches] = useState(true);
  const [loadingMMR, setLoadingMMR] = useState(true);

  const globalLoading = loadingMatches || loadingMMR;


  useEffect(() => {
    if (playerData) {
      const fetchMatches = async () => {
        try {
          const matchesResponse = await axios.get(`/player/stored-matches/${playerData.puuid}`);
          console.log("Matches: ", matchesResponse.data.data);
          setMatches(matchesResponse.data.data);
        } catch (error) {
            console.error("Error fetching matches", error);
        } finally {
          setLoadingMatches(false);
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
          setPlayerMMR(mmrResponse.data.data);
        } catch (error) {
          console.error("Error fetching player MMR", error);
        } finally {
          setLoadingMMR(false);
        }
      };
      fetchMMR();
    }
  }, [playerData]);

  /*
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
  */
 
  const visibleMatches = filteredMatches.slice(0, numMatches);

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.overview}>
        {globalLoading ? (
          <Skeleton variant="rectangular" width="100%" height={50} style={{ marginBottom: ".75em" }} />
        ) : (
          <GamemodeSelector gamemodes={gamemodes} selectedMode={selectedMode} onSelectMode={setSelectedMode} />
        )}
        <div className={styles.cols}>
          <div className={styles.leftCol}>
            {globalLoading ? (
              <>
                <Skeleton variant="rectangular" width="100%" height={336} />
                <Skeleton variant="rectangular" width="100%" height={260} />
                <Skeleton variant="rectangular" width="100%" height={367} />
              </>
            ) : (
              <GeneralStats matches={matches} playerMMR={playerMMR}/>
            )}
          </div>
          <div className={styles.rightCol}>
            {globalLoading ? (
              <>
                <Skeleton variant="rectangular" width="100%" height={150} />
                {Array.from({ length: 7 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    animation="wave"
                    width="100%"
                    height={90}
                    style={{ marginBottom: 10 }}
                  />
                ))}
              </>
            ) : (
              <>
                <Summary matches={visibleMatches}/>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsContent;