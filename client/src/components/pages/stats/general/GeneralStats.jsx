import RankedHistory from "./RankedHistory";
import Activity from "./Activity";
import Accuracy from "./Accuracy";

import styles from "./GeneralStats.module.css";

const GeneralStats = ({ matches, playerMMR }) => {
  return (
    <div className={styles.container}>
      <RankedHistory playerMMR={playerMMR} />
      <Activity matches={matches}/>
      <Accuracy />
    </div>
  );
};

export default GeneralStats;