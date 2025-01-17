import { useState, useEffect } from "react";

import RankedTable from "./RankedTable";
import { GlobalData } from "../../../../../contexts/GlobalDataProvider";

import sharedStyles from "../../../../../styles/Shared.module.css";
import styles from "./RankedHistory.module.css";

const RankedHistory = ({ playerMMR, height }) => {

  const { tiers } = GlobalData();
  const rankTable = tiers?.[tiers.length - 1];

  const [showAll, setShowAll] = useState(false);
  const sortedMMR = playerMMR && playerMMR.seasonal ? [...playerMMR.seasonal].reverse() : [];
  const visibleMMR = showAll ? sortedMMR : sortedMMR.slice(0, 5);

  const currentRR = playerMMR?.current?.rr ?? "N/A";

  const [peakTierImage, setPeakTierImage] = useState("");
  const [currTierImage, setCurrTierImage] = useState("");
  
  useEffect (() => {
    if (rankTable && playerMMR) {
      setPeakTierImage(rankTable.tiers[playerMMR.peak.tier.id].smallIcon);
    }
  }, [rankTable, playerMMR]);

  useEffect (() => {
    if (rankTable && playerMMR) {
      setCurrTierImage(rankTable.tiers[playerMMR.current.tier.id].smallIcon);
    }
  }, [rankTable, playerMMR]);

  return (
    <div className={styles.container} style={{ height }}>
      <div className={styles.content}>
        <h2 className={sharedStyles.smallHeading}>Competitive</h2>
        <div className={styles.summary}>
          <div className={styles.item}>
            <h3 className={styles.h3}>Current</h3>
            <div className={styles.currRank}>
              <img className={styles.img} src={currTierImage} alt="" />
              <span>{currentRR} rr</span>
            </div>
          </div>
          <div className={styles.item}>
            <h3 className={styles.h3}>Peak</h3>
            <div>
              <img className={styles.img} src={peakTierImage} alt="" />
            </div>
          </div>
        </div>
        <RankedTable visibleMMR={visibleMMR}/>
      </div>
      {sortedMMR.length > 5 && (
        <button onClick={() => setShowAll((prev) => !prev)} className={styles.btn}>
          {showAll ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
};

export default RankedHistory;

