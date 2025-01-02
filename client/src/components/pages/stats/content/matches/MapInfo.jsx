import styles from "./MapInfo.module.css";

const MapInfo = ({ result, roundsWon, roundsLost, name }) => {

  return (
    <div className={styles.mapInfo}>
      <span className={`${styles.result} ${result === "Victory" ? styles.victory : result === "Defeat" ? styles.defeat: styles.draw}`}>
        {result === "Victory" ? "Victory" : result === "Defeat" ? "Defeat" : result === "Draw" ? "Draw": ""}
      </span>
      <span className={`${styles.roundDiff} ${result === "Victory" ? styles.victory : result === "Defeat" ? styles.defeat: styles.draw}`}>
        {result === "None" ? `${roundsWon} : 40` : `${roundsWon} : ${roundsLost}`}
      </span>
      <span className={styles.mapName}>{name}</span>
    </div>
  );
};

export default MapInfo;