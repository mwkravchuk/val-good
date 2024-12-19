import { useState } from "react";

import { GlobalData }  from "../../../../contexts/GlobalDataProvider";

import styles from "./RankedHistory.module.css";

const RankedHistory = ({ playerMMR, height }) => {
  const [showAll, setShowAll] = useState(false);
  const sortedMMR = playerMMR && playerMMR.seasonal ? [...playerMMR.seasonal].reverse() : [];
  const visibleMMR = showAll ? sortedMMR : sortedMMR.slice(0, 5);

  const { tiers } = GlobalData();
  const rankTable = tiers[tiers.length - 1];

  return (
    <div className={styles.container} style={{ height }}>
      <h2>Ranked history</h2>
      <ul>
        {visibleMMR.map((seasonData, index) => (
          <li key={index} className={styles.seasonItem}>
            <span>{seasonData.season.short}</span>
            <img src={rankTable.tiers[seasonData.end_tier.id].smallIcon} alt="Rank Icon" className={styles.rankImage}/>
            <span>{seasonData.end_tier.name}</span>
            <span className={styles.games}>{seasonData.games}</span>
          </li>
        ))}
      </ul>
      {sortedMMR.length > 5 && (
        <button onClick={() => setShowAll((prev) => !prev)} className={styles.btn}>
          {showAll ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
};

export default RankedHistory;