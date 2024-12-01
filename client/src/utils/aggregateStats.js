export const aggregateStats = (matches) => {
  const stats = {
    totalGames: matches.length,
    wins: 0,
    losses: 0,
    kills: 0,
    deaths: 0,
    assists: 0,
    headshots: 0,
    bodyshots: 0,
    legshots: 0,
  };

  matches.forEach((match) => {
    stats.kills += match.stats.kills;
    stats.deaths += match.stats.deaths;
    stats.assists += match.stats.assists;
    stats.headshots += match.stats.shots.head;
    stats.bodyshots += match.stats.shots.body;
    stats.legshots += match.stats.shots.leg;
  });

  stats.totalshots = stats.headshots + stats.bodyshots + stats.legshots;

  stats.winRate = (stats.wins / stats.totalGames) * 100;
  stats.hsp = (stats.headshots / stats.totalshots) * 100;

  return stats;
};
