import styles from "./KDAVisual.module.css";

const KDAVisual = ({ stats }) => {

  const totalKDA = ((stats.kills + stats.assists) / stats.deaths).toFixed(2);
  const avgKills = (stats.kills / stats.totalGames).toFixed(1);
  const avgDeaths = (stats.deaths / stats.totalGames).toFixed(1);
  const avgAssists = (stats.assists / stats.totalGames).toFixed(1);

  return (
    <div className={styles.container}>
      <span className={styles.KDA}>{totalKDA} : 1</span>
      <div className={styles.kda}>
        <span className={styles.kills}>{avgKills}</span>
        &nbsp;/&nbsp;
        <span className={styles.deaths}>{avgDeaths}</span>
        &nbsp;/&nbsp;
        <span className={styles.assists}>{avgAssists}</span>
      </div>
    </div>
  );
};

export default KDAVisual;