import { useState, useEffect } from "react";
import axios from "../../../../axiosConfig";

import styles from "./StatsHead.module.css";

const StatsHead = ({ playerInfo, playerData }) => {

  const [cardArt, setCardArt] = useState(null);

  useEffect(() => {
    if (playerData) {
      const fetchCardArt = async () => {
        try {
          const cardArtResponse = await axios.get(`/player/card/${playerData.card}`);
          console.log(cardArtResponse.data.data);
          setCardArt(cardArtResponse.data.data);
        } catch (error) {
            console.error("Error fetching card art", error);
        }
      }
      fetchCardArt();
    }
  }, [playerData]);

  return (
    <div
      className={styles.container}
      style={{ backgroundImage: cardArt ? `linear-gradient(to bottom, hsl(var(--background-color-transparent)), hsl(var(--background-color-dark-transparent))), url(${cardArt.wideArt})` : "none"}}>

      <div className={styles.head}>
        <div className={styles.infoContainer}>
          {playerInfo[0]} #{playerInfo[1]}
        </div>
      </div>
    </div>
  );
};

export default StatsHead;