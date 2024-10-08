import ResultInfo from "./ResultInfo";
import AgentInfo from "./AgentInfo";
import MapInfo from "./MapInfo";
import DetailedInfo from "./DetailedInfo";

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
      <ResultInfo victory={victory} mode={match.meta.mode} timestamp={match.meta.started_at}/>
      <AgentInfo />
      <MapInfo victory={victory} name={match.meta.map.name}/>
      <DetailedInfo />
    </li>
  );
}

export default MatchItem;