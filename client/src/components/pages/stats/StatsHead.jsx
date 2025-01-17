import { useState, useEffect, useMemo } from "react";
import axios from "../../../../axiosConfig";

import Skeleton from "@mui/material/Skeleton";

import styles from "./StatsHead.module.css";

const formatDate = (utcString) => {
  if (!utcString) return "N/A";
  const date = new Date(utcString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });
};

const getFlag = (region) => {
  const flags = {
    na: "🇺🇸", // American flag emoji
    eu: "🇪🇺", // European Union flag
    ap: "🌏",  // Asia-Pacific globe
    // Add more regions and flags as needed
  };
  return flags[region?.toLowerCase()] || ""; // Default to no flag
};

const StatsHead = ({ playerInfo, playerData }) => {

  const lastUpdated = useMemo(() => formatDate(playerData?.updated_at), [playerData?.updated_at]);

  const [cardArt, setCardArt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (playerData) {
      const fetchCardArt = async () => {
        try {
          const cardArtResponse = await axios.get(`/player/card/${playerData.card}`);
          setCardArt(cardArtResponse.data.data);
        } catch (error) {
          console.error("Error fetching card art", error);
        } finally {
          setLoading(false);
        }
      }
      fetchCardArt();
    }
  }, [playerData]);

  return (
    <>
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height={300} style={{ marginBottom: ".75em" }} />
      ) : (
        <div
          className={styles.container}
          style={{ backgroundImage: cardArt
          ? `linear-gradient(to bottom, hsl(var(--background-color-transparent)), hsl(var(--background-color-dark-transparent))),
             linear-gradient(to top, hsl(var(--background-color-dark-transparent)), hsl(var(--background-color-transparent))),
             url(${cardArt.wideArt})`
          : "none",
          }}
        >
          <div className={styles.head}>
            <div className={styles.infoContainer}>
              <span className={styles.big}>{playerInfo[0]} #{playerInfo[1]}</span>
              <span>{playerData?.region?.toUpperCase()} {getFlag(playerData?.region)}</span>
              <span>Level {playerData?.account_level}</span>
              <span className={styles.lastUpdated}>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StatsHead;