import RankedHistory from "./RankedHistory";
import ActivityHeatmap from "./ActivityHeatmap";
import Accuracy from "./Accuracy";

import styles from "./GeneralStats.module.css";

const GeneralStats = ({ playerMMR }) => {
  return (
    <>
      <RankedHistory playerMMR={playerMMR} height="150px"/>
      <ActivityHeatmap height="250px"/>
      <Accuracy height="150px"/>
    </>
  );
};

export default GeneralStats;