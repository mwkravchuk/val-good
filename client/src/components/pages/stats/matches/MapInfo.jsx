import styles from "./MapInfo.module.css";

const MapInfo = ({ victory, roundsWon, roundsLost, name }) => {
  return (
    <div className={styles.mapInfo}>
        <span className={`${styles.result} ${victory ? (styles.victory) : (styles.defeat)}`}>{victory ? "Victory" : "Defeat"}</span>
        <span className={`${styles.roundDiff} ${victory ? (styles.victory) : (styles.defeat)}`}>{roundsWon} : {roundsLost}</span>
        <span className={styles.mapName}>{name}</span>
    </div>
  );
};

export default MapInfo;