import AccuracySummary from "./AccuracySummary";
import AccuracyChart from "./AccuracyChart";

import styles from "./Accuracy.module.css";
import sharedStyles from "../../../../../styles/Shared.module.css";

const Accuracy = ({ matches }) => {

  const competitiveGames = (matches.filter((match) => match.meta.mode === "Competitive")).slice(-50).reverse();
  const chartData = competitiveGames.map((match) => {
    const { head, body, leg } = match.stats.shots;
    const total = head + body + leg
    const accuracy = total > 0 ? (head / total) * 100 : 0;
    return { accuracy: accuracy.toFixed(2) };
  });

  const totals = competitiveGames.reduce(
    (acc, match) => {
      acc.head += match.stats.shots.head;
      acc.body += match.stats.shots.body;
      acc.leg += match.stats.shots.leg;
      acc.total += match.stats.shots.head + match.stats.shots.body + match.stats.shots.leg
      return acc;
    },
    { head: 0, body: 0, leg: 0, total: 0 } // Initial accumulator object
  );


  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={sharedStyles.smallHeading}>Accuracy <span className={styles.note}>last 50 games</span></h2>
        <AccuracySummary totals={totals}/>
        <AccuracyChart data={chartData}/>
      </div>
    </div>
  );
};

export default Accuracy;