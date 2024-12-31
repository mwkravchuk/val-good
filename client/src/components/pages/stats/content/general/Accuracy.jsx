import AccuracyChart from "./AccuracyChart";

import styles from "./Accuracy.module.css";
import sharedStyles from "../../../../../styles/Shared.module.css";

const Accuracy = ({ matches }) => {

  const competitiveGames = (matches.filter((match) => match.meta.mode === "Competitive")).slice(-50).reverse();
  const chartData = competitiveGames.map((match, index) => {
    const { head, body, leg } = match.stats.shots;
    const total = head + body + leg
    const accuracy = total > 0 ? (head / total) * 100 : 0;
    return { game: index + 1, accuracy: accuracy.toFixed(2) };
  });


  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={sharedStyles.smallHeading}>Accuracy</h2>
        <AccuracyChart data={chartData}/>
      </div>
    </div>
  );
};

export default Accuracy;