import { aggregateStats } from "../../../../utils/aggregateStats";

import KDAVisual from "./summary/KDAVisual";
import RoleVisual from "./summary/RoleVisual";
import WinLossCircle from "../../../external/WinLossCircle";

import styles from "./Summary.module.css";

const Summary = ({ matches }) => {

  const stats = aggregateStats(matches);
  console.log("Stats: ", stats);

  return (
    <div className={styles.container}>
      <KDAVisual stats={stats}/>
      <div className={styles.middle}>
        <WinLossCircle wins={stats.wins} losses={stats.losses} />
        <span className={styles.WL}>{stats.wins}W {stats.losses}L {stats.draws}D</span>
      </div>
      <RoleVisual stats={stats}/>
    </div>
  );
};

export default Summary;