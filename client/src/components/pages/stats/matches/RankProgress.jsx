import { useState, useEffect } from "react";

import styles from "./RankProgress.module.css";

const RankProgress = ({ tier, rankTable }) => {

  const [tierImage, setTierImage] = useState("");

  useEffect (() => {
    if (rankTable && tier) {
      setTierImage(rankTable.tiers[tier].smallIcon);
    }
  }, [rankTable, tier]);

  return (
    <div className={styles.progress}>
      <img src={tierImage} alt="Rank Icon" className={styles.rankIcon}/>
    </div>
  );
};

export default RankProgress;