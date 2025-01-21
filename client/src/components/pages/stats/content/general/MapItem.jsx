import styles from "./MapItem.module.css";

const MapItem = ({ map }) => {
  return (
    <div className={styles.mapItemContainer}>
      <h3>{map.map}</h3>
      <p>{map.winRate}</p>
      <span>{map.win} / {map.loss} / {map.draw}</span>
    </div>
  );
};

export default MapItem;