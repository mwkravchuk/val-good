import RankedHistory from "./general/RankedHistory";
import Activity from "./general/Activity";
import WinRates from "./general/WinRates";
import Accuracy from "./general/Accuracy";

import styles from "./GeneralStats.module.css";

const GeneralStats = ({ allMatches, actMatches, playerMMR }) => {
  return (
    <div className={styles.container}>
      <RankedHistory playerMMR={playerMMR} />
      <Activity matches={allMatches}/>
      <WinRates matches={actMatches}/>
      <Accuracy matches={actMatches}/>
    </div>
  );
};

export default GeneralStats;