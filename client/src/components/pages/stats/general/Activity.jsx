import Heatmap from "./Heatmap";

import sharedStyles from "../../../../styles/Shared.module.css";
import styles from "./Activity.module.css";

const Activity = ({ matches }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={sharedStyles.smallHeading}>Activity</h2>
        <div className={styles.heatmapContainer}>
        <Heatmap matches={matches}/>
        </div>
      </div>
    </div>
  );
};

export default Activity;