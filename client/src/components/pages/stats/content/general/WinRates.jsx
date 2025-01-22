import MapItem from "./MapItem";

import styles from "./WinRates.module.css";
import sharedStyles from "../../../../../styles/Shared.module.css";

const WinRates = ({ matches }) => {

  const competitiveGames = (matches.filter((match) => match.meta.mode === "Competitive")).slice(0, 50);
  const mapResults = {}
  competitiveGames.forEach((game) => {
    const mapName = game.meta.map.name;
    const userTeam = game.stats.team.toLowerCase();
    const { red, blue } = game.teams;

    const userRounds = userTeam === "red" ? red : blue;
    const enemyRounds = userTeam === "red" ? blue : red;

    let result;
    if (userRounds > enemyRounds) {
      result = "win";
    } else if (userRounds < enemyRounds) {
      result = "loss";
    } else {
      result = "draw";
    }

    if (!mapResults[mapName]) {
      mapResults[mapName] = { win: 0, loss: 0, draw: 0, total: 0}
    }

    mapResults[mapName][result] += 1
    mapResults[mapName].total += 1
  });

  const winRates = Object.entries(mapResults).map(([map, { win, loss, draw, total }]) => ({
    map,
    win,
    loss,
    draw,
    winRate: ((win / total) * 100).toFixed(2), // Calculate win rate as a percentage
    totalGames: total,
  }));

  const sortedMaps = winRates.sort((a, b) => parseFloat(b.winRate) - parseFloat(a.winRate));

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={sharedStyles.smallHeading}>Win Rates <span className={styles.note}>last 50 games</span></h2>
        <div className={styles.mapList}>
          {sortedMaps.map((map, index) => (
            <MapItem key={index} map={map}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WinRates;