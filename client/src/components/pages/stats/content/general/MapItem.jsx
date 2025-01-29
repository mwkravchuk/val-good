import styles from "./MapItem.module.css";

const MapItem = ({ map, maps }) => {

  const getWinRateClass = (winRate) => {
    if (winRate > 55) return styles.green;
    if (winRate < 45) return styles.red;
    return styles;
  };

  console.log("maps", maps);
  console.log("map:", map);
  


  const mapFromApi = maps.find((mapInApi) => mapInApi.uuid === map.mapId);
  console.log("map from api: ", mapFromApi);
  const mapBackground = mapFromApi?.premierBackgroundImage;

  return (
    <div className={styles.mapItemContainer}>
      <span className={styles.mapName}>{map.map}</span>
      <span className={`${styles.winRate} ${getWinRateClass(map.winRate)}`}>{map.winRate}%</span>
      <span>{map.win} / {map.loss} / {map.draw}</span>
    </div>
  );
};

export default MapItem;