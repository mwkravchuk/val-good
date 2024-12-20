import RankedHistory from "./RankedHistory";
import ActivityHeatmap from "./ActivityHeatmap";
import Accuracy from "./Accuracy";

import styles from "./GeneralStats.module.css";

const GeneralStats = ({ playerMMR }) => {
  return (
    <div className={styles.container}>
      <RankedHistory playerMMR={playerMMR} />
      <ActivityHeatmap />
      <Accuracy />
    </div>
  );
};

export default GeneralStats;