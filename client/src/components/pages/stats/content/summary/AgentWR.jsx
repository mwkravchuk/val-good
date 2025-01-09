import { GlobalData } from "../../../../../contexts/GlobalDataProvider";

import styles from "./AgentWR.module.css";

const AgentWR = ({ stats }) => {

    const { agents } = GlobalData();
    const playedAgents = stats.agents;
  
    const getTopAgents = (agents) => {
      // Convert agents object into an array with additional calculated fields
      const agentArray = Object.entries(agents).map(([name, stats]) => ({
        name,
        games: stats.games,
        wins: stats.wins,
        losses: stats.losses,
        draws: stats.draws,
        winPercentage: ((stats.wins / stats.games) * 100).toFixed(2), // Calculate win percentage
      }));
    
      const sortedAgents = agentArray.sort((a, b) => b.games - a.games);  
      const topAgents = sortedAgents.slice(0, 3);
      return topAgents;
    };
    
    const topAgents = getTopAgents(playedAgents);
  
    const getWinRateClass = (winRate) => {
      if (winRate > 55) return styles.green;
      if (winRate < 45) return styles.red;
      return styles;
    };
  return (
    <div className={styles.container}>
      <span className={styles.heading}>From {stats.totalGames} most recent games</span>
      <div>
        {topAgents.map((agent) => {
          const matchedAgent = agents.find((apiAgent) => apiAgent.displayName === agent.name);

          return (
            <div className={styles.item} key={agent.name}>
              {matchedAgent && (
                <img src={matchedAgent.displayIconSmall}
                      alt={`${agent.name} icon`}/>
              )}
              <span className={getWinRateClass(Math.round((agent.wins / agent.games) * 100))}>{Math.round((agent.wins / agent.games) * 100)}%</span>
              <span className={styles.WLD}>&#40;{agent.wins}W {agent.losses}L {agent.draws}D&#41;</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AgentWR;