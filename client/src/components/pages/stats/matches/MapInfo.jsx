import styles from "./MapInfo.module.css";

const MapInfo = ({ victory, roundsWon, roundsLost, name }) => {
  return (
    <div className={styles.mapInfo}>
        <span>{victory ? "Victory" : "Defeat"}</span>
        <img src="map.png" alt="" />
        <span className={styles.roundDiff}>{roundsWon} : {roundsLost}</span>
        <span>{name}</span>
    </div>
  );
};

export default MapInfo;