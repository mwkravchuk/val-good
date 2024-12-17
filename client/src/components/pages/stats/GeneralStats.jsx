import { aggregateStats } from "../../../utils/aggregateStats";

import KDAVisual from "./KDAVisual";
import RoleVisual from "./RoleVisual";
import WinLossCircle from "../../external/WinLossCircle";

import styles from "./GeneralStats.module.css";

const GeneralStats = ({ matches }) => {

  const stats = aggregateStats(matches);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <KDAVisual stats={stats}/>
      </div>
      <div className={styles.middle}>
        <WinLossCircle wins={stats.wins} losses={stats.losses} />
        <span className={styles.WL}>{stats.wins}W {stats.losses}L</span>
      </div>
      <div className={styles.right}>
        <RoleVisual favoriteAgent={stats.favoriteAgent}/>
      </div>
    </div>
  );
};

export default GeneralStats