import styles from "./WinRates.module.css";
import sharedStyles from "../../../../../styles/Shared.module.css";

const WinRates = ({ matches }) => {

  const competitiveGames = (matches.filter((match) => match.meta.mode === "Competitive")).slice(-50).reverse();
  console.log("comp games: ", competitiveGames);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={sharedStyles.smallHeading}>Win Rates <span className={styles.note}>last 50 games</span></h2>
        <div>
          Win
        </div>
      </div>
    </div>
  );
};

export default WinRates;