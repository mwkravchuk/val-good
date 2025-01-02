

const RoleVisual = ({ stats }) => {

  const agents = stats.agents;

  const getTopAgents = (agents) => {
    // Convert agents object into an array with additional calculated fields
    const agentArray = Object.entries(agents).map(([name, stats]) => ({
      name,
      games: stats.games,
      wins: stats.wins,
      losses: stats.losses,
      winPercentage: ((stats.wins / stats.games) * 100).toFixed(2), // Calculate win percentage
    }));
  
    const sortedAgents = agentArray.sort((a, b) => b.games - a.games);  
    const topAgents = sortedAgents.slice(0, 3);
    return topAgents;
  };
  
  const topAgents = getTopAgents(agents);
  
  topAgents.forEach((agent) => {
    console.log(
      `${agent.name}: ${agent.games} games, ${agent.winPercentage}% win rate`
    );
  });

  return (
    <div>
      <div>
        From {stats.totalGames} most recent games
      </div>
      <div>
        {topAgents.map((agent) => (
          <div key={agent.name}>
            <span>{agent.name}</span>
            <span>&#40;{agent.wins} / {agent.losses}&#41;</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleVisual;