import { useState, useEffect } from "react";

import axios from "../../../../../axiosConfig";

import styles from "./MapInfo.module.css";

const MapInfo = ({ victory, roundsWon, roundsLost, name, mapId }) => {

  const [map, setMap] = useState(null);

  useEffect(() => {
    if (mapId) {
      const fetchMapImage = async () => {
        try {
          const mapResponse = await axios.get(`/valorant/map/${mapId}`);
          setMap(mapResponse.data.data);
        } catch (error) {
            console.error("Error fetching map image", error);
        }
      }
      fetchMapImage();
    }
  }, [mapId]);

  return (
    <div className={styles.mapInfo}>
        <span className={`${styles.result} ${victory ? (styles.victory) : (styles.defeat)}`}>{victory ? "Victory" : "Defeat"}</span>
        <span className={`${styles.roundDiff} ${victory ? (styles.victory) : (styles.defeat)}`}>{roundsWon} : {roundsLost}</span>
        <span className={styles.mapName}>{name}</span>
    </div>
  );
};

export default MapInfo;