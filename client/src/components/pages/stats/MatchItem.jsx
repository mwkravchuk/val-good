import styles from "./MatchItem.module.css";

const MatchItem = ({ match }) => {

  const isVictory = (match) => {
    const selfTeam = match.stats.team;
    const winningTeam = match.teams.blue > match.teams.red ? "Blue" : "Red";
    return match.meta.mode === "Deathmatch" || selfTeam === winningTeam;
  }

  const victory = isVictory(match);

  return (
    <li className={`${styles.matchContainer} ${victory ? styles.matchVictory : styles.matchDefeat}`}>
      <span className={`${styles.resultTag} ${victory ? styles.victoryText : styles.defeatText}`}>{victory ? "Victory" : "Defeat"}</span>
      <p>Map: {match.meta.map.name} ...... Mode: {match.meta.mode}</p>
    </li>
  );
}

export default MatchItem;