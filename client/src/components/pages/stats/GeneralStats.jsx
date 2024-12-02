import { aggregateStats } from "../../../utils/aggregateStats";
import WinLossCircle from "../../external/WinLossCircle";

import styles from "./GeneralStats.module.css";



const GeneralStats = ({ matches }) => {

  const stats = aggregateStats(matches);

  return (
    <div className={styles.container}>
      general stats
      <span>kda: {stats.kda}</span>
      <WinLossCircle wins={stats.wins} losses={stats.losses} />
    </div>
  );
};

export default GeneralStats