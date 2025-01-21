import styles from "./MapItem.module.css";

const MapItem = ({ map }) => {

  const getWinRateClass = (winRate) => {
    if (winRate > 55) return styles.green;
    if (winRate < 45) return styles.red;
    return styles;
  };

  return (
    <div className={styles.mapItemContainer}>
      <span className={styles.mapName}>{map.map}</span>
      <span className={getWinRateClass(map.winRate)}>{map.winRate}%</span>
      <span>{map.win} / {map.loss} / {map.draw}</span>
    </div>
  );
};

export default MapItem;