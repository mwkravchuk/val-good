import styles from "./MapInfo.module.css";

const MapInfo = ({ victory, name }) => {
  return (
    <div className={styles.mapInfo}>
        <span>{victory ? "Victory" : "Defeat"}</span>
        <img src="map.png" alt="" />
        <span>{name}</span>
    </div>
  );
};

export default MapInfo;