import { aggregateStats } from "../../../utils/aggregateStats";
import WinLossCircle from "../../external/WinLossCircle";

import styles from "./GeneralStats.module.css";

const GeneralStats = ({ matches }) => {

  const stats = aggregateStats(matches);
  const totalKDA = ((stats.kills + stats.assists) / stats.deaths).toFixed(2);
  const avgKills = (stats.kills / stats.totalGames).toFixed(1);
  const avgDeaths = (stats.deaths / stats.totalGames).toFixed(1);
  const avgAssists = (stats.assists / stats.totalGames).toFixed(1);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <span className={styles.KDA}>{totalKDA} : 1</span>
        <div className={styles.kda}>
          <span className={styles.kills}>{avgKills}</span>
          &nbsp;/&nbsp;
          <span className={styles.deaths}>{avgDeaths}</span>
          &nbsp;/&nbsp;
          <span className={styles.assists}>{avgAssists}</span>
        </div>
      </div>
      <div className={styles.middle}>
        <WinLossCircle wins={stats.wins} losses={stats.losses} />
        <span className={styles.WL}>{stats.wins}W {stats.losses}L</span>
      </div>
      <div className={styles.right}>
        <span>Best map: {stats.bestMap ? `${stats.bestMap.map} ${stats.bestMap.winRate}` : "No data"} </span>
        <span>Best agent: {stats.bestAgent ? `${stats.bestAgent.agent} ${stats.bestAgent.winRate}` : "No data"}</span>
        <span>Favorite agent: {stats.bestMap ? `${stats.favoriteAgent.agent} ${stats.favoriteAgent.playRate}` : "a"}</span>
      </div>
    </div>
  );
};

export default GeneralStats