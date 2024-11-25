import ResultInfo from "./ResultInfo";
import AgentInfo from "./AgentInfo";
import MapInfo from "./MapInfo";
import DetailedInfo from "./DetailedInfo";

import styles from "./MatchItem.module.css";

const MatchItem = ({ match, rankTable }) => {

  const { meta, teams, stats } = match; // Destructure match
  const { map, mode, started_at } = meta; // Destructure meta
  const { blue: blueRounds, red: redRounds } = teams; // Destructure teams 
  const { character, score, damage, kills, deaths, assists, team, shots, tier} = stats; // Destructure stats

  const agentId = character.id
  const numShots = (shots.head + shots.body + shots.leg);
  const hsp = numShots > 0 ? (shots.head / numShots).toFixed(2) : 0;
  const acs = Math.round(score / (blueRounds + redRounds));
  const damageDelta = Math.round(damage.made - damage.received);
  const damagePerRound = Math.round(damage.made / (blueRounds + redRounds));
  const roundsWon = team === 'Blue' ? blueRounds : redRounds;
  const roundsLost = team === 'Blue' ? redRounds : blueRounds;

  const isVictory = () => {
    const selfTeam = team;
    const winningTeam = blueRounds > redRounds ? "Blue" : "Red";
    return mode === "Deathmatch" || selfTeam === winningTeam;
  }

  const victory = isVictory();

  return (
    <li className={`${styles.matchContainer} ${victory ? styles.matchVictory : styles.matchDefeat}`}>
      <div className={styles.left}>
        <ResultInfo victory={victory} mode={mode} timestamp={started_at} tier={tier} rankTable={rankTable}/>
        <AgentInfo victory={victory} kills={kills} deaths={deaths} assists={assists} agentId={agentId} />
      </div>
      <div className={styles.middle}>
        <MapInfo victory={victory} roundsWon={roundsWon} roundsLost={roundsLost} name={map.name}/>
      </div>
      <div className={styles.right}>
        <DetailedInfo mode={mode} acs={acs} hsp={hsp} damageDelta={damageDelta} damagePerRound={damagePerRound}/>
      </div>
    </li>
  );
}

export default MatchItem;