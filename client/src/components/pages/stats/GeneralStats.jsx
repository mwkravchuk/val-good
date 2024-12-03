import { aggregateStats } from "../../../utils/aggregateStats";
import WinLossCircle from "../../external/WinLossCircle";

import styles from "./GeneralStats.module.css";

const GeneralStats = ({ matches }) => {

  const stats = aggregateStats(matches);
  const totalKDA = ((stats.kills + stats.assists) / stats.deaths).toFixed(2);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <span className={styles.KDA}>{totalKDA} : 1</span>
      </div>
      <div className={styles.middle}>
        <WinLossCircle wins={stats.wins} losses={stats.losses} />
        <span className={styles.WL}>{stats.wins}W {stats.losses}L</span>
      </div>
      <div className={styles.right}></div>
    </div>
  );
};

export default GeneralStats