import { useState, useEffect } from "react";

import HorizontalBar from "../../../../common/HorizontalBar.jsx";
import RankProgress from "./RankProgress.jsx";

import styles from "./ResultInfo.module.css";

const ResultInfo = ({ result, mode, timestamp, tier, rankTable }) => {
  const [timeAgo, setTimeAgo] = useState("");

  // Function to calculate the "time ago"
  const calculateTimeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now - past) / 1000);

    const timeUnits = [
      { unit: "year", seconds: 31536000 },
      { unit: "month", seconds: 2592000 },
      { unit: "week", seconds: 604800 },
      { unit: "day", seconds: 86400 },
      { unit: "hour", seconds: 3600 },
      { unit: "minute", seconds: 60 },
      { unit: "second", seconds: 1 },
    ];

    for (let i = 0; i < timeUnits.length; i++) {
      const { unit, seconds } = timeUnits[i];
      const count = Math.floor(diffInSeconds / seconds);
      if (count > 0) {
        return count === 1 ? `1 ${unit} ago` : `${count} ${unit}s ago`;
      }
    }

    return "just now";
  };

  useEffect(() => {
    const timeAgoText = calculateTimeAgo(timestamp);
    setTimeAgo(timeAgoText);
  }, [timestamp]);

  return (
    <div className={styles.resultInfo}>
      <span className={`${styles.resultTag} ${result === "Victory" ? styles.victoryText : result === "Defeat" ? styles.defeatText : styles.drawText}`}>{mode}</span>
      <span className={styles.timeAgo}>{timeAgo}</span>
      <HorizontalBar color={result === "Victory" ? "hsl(var(--victory-color-shadow))" : result === "Defeat" ? "hsl(var(--defeat-color-shadow))" : "hsl(var(--draw-color-shadow))"} margin={"6px"} width={"60%"}/>
      {mode === "Competitive" ? <RankProgress tier={tier} rankTable={rankTable}/> : ""}
    </div>
  );
};

export default ResultInfo;