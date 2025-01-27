import ResultInfo from "./ResultInfo";
import AgentInfo from "./AgentInfo";
import MapInfo from "./MapInfo";
import DetailedInfo from "./DetailedInfo";
import VerticalBar from "../../../../common/VerticalBar";

import styles from "./MatchItem.module.css";

const MatchItem = ({ match, rankTable }) => {

  const { meta, teams, stats } = match; // Destructure match
  const { map, mode, started_at } = meta; // Destructure meta
  const { blue: blueRounds, red: redRounds } = teams; // Destructure teams 
  const { character, score, damage, kills, deaths, assists, team, shots, tier} = stats; // Destructure stats

  const agentId = character.id
  const numShots = (shots.head + shots.body + shots.leg);
  const kda = ((kills + assists) / deaths).toFixed(2)
  const hsp = numShots > 0 ? (shots.head / numShots).toFixed(2) : 0;
  const acs = Math.round(score / (blueRounds + redRounds));
  const damageDelta = Math.round(damage.made - damage.received);
  const damagePerRound = Math.round(damage.made / (blueRounds + redRounds));
  const roundsWon = team === 'Blue' ? blueRounds : redRounds;
  const roundsLost = team === 'Blue' ? redRounds : blueRounds;

  const getResult = () => {
    const selfTeam = team;
    if (mode === "Deathmatch") {
      return "None";
    }
    if (blueRounds === redRounds) {
      return "Draw";
    }
    const winningTeam = blueRounds > redRounds ? "Blue" : "Red";
    return selfTeam === winningTeam ? "Victory" : "Defeat";
  }

  const result = getResult();

  return (
    <li className={`${styles.matchContainer} ${result === "Victory" ? styles.matchVictory : result === "Defeat" ? styles.matchDefeat : styles.matchDraw}`}>
      <div className={styles.left}>
        <ResultInfo result={result} mode={mode} timestamp={started_at} tier={tier} rankTable={rankTable}/>
        <AgentInfo kills={kills} deaths={deaths} assists={assists} hsp={hsp} agentId={agentId} />
        <VerticalBar color={result === "Victory"
          ? "hsl(var(--victory-color-shadow))"
          : result === "Defeat"
          ? "hsl(var(--defeat-color-shadow))"
          : "hsl(var(--draw-color-shadow))"} margin={"8px"} height={"80%"}
        />
        <DetailedInfo mode={mode} kda={kda} hsp={hsp} acs={acs} damageDelta={damageDelta} damagePerRound={damagePerRound}/>
      </div>
      <div className={styles.middle}>
        <MapInfo result={result} roundsWon={roundsWon} roundsLost={roundsLost} name={map.name}/>
      </div>
      <div className={styles.right}>
      </div>
    </li>
  );
}

export default MatchItem;