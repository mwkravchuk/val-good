import RankedHistory from "./general/RankedHistory";
import Activity from "./general/Activity";
import WinRates from "./general/WinRates";
import Accuracy from "./general/Accuracy";

import styles from "./GeneralStats.module.css";

const GeneralStats = ({ matches, playerMMR }) => {
  return (
    <div className={styles.container}>
      <RankedHistory playerMMR={playerMMR} />
      <Activity matches={matches}/>
      <WinRates matches={matches}/>
      <Accuracy matches={matches}/>
    </div>
  );
};

export default GeneralStats;