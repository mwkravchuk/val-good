import { useState } from "react";

import RankedTable from "./RankedTable";

import sharedStyles from "../../../../styles/Shared.module.css";
import styles from "./RankedHistory.module.css";

const RankedHistory = ({ playerMMR, height }) => {
  const [showAll, setShowAll] = useState(false);
  const sortedMMR = playerMMR && playerMMR.seasonal ? [...playerMMR.seasonal].reverse() : [];
  const visibleMMR = showAll ? sortedMMR : sortedMMR.slice(0, 5);

  return (
    <div className={styles.container} style={{ height }}>
      <div className={styles.content}>
        <h2 className={sharedStyles.smallHeading}>Competitive</h2>
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

