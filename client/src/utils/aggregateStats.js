export const aggregateStats = (matches) => {
  const stats = {
    totalGames: matches.length,
    wins: 0,
    losses: 0,
    draws: 0,
    kills: 0,
    deaths: 0,
    assists: 0,
    headshots: 0,
    bodyshots: 0,
    legshots: 0,
  };

  matches.forEach((match) => {
    updateWinsLosses(match, stats);
    stats.kills += match.stats.kills;
    stats.deaths += match.stats.deaths;
    stats.assists += match.stats.assists;
    stats.headshots += match.stats.shots.head;
    stats.bodyshots += match.stats.shots.body;
    stats.legshots += match.stats.shots.leg;
  });

  stats.totalshots = stats.headshots + stats.bodyshots + stats.legshots;

  stats.winRate = (stats.wins / stats.totalGames) * 100;
  stats.kda = ((stats.kills + stats.assists) / stats.deaths).toFixed(2);
  stats.hsp = (stats.headshots / stats.totalshots) * 100;

  return stats;
};

const updateWinsLosses = (match, stats) => {
  const { blue: blueRounds, red: redRounds } = match.teams;
  const selfTeam = match.stats.team; // "Blue" or "Red"
  if (blueRounds === redRounds) {
    stats.draws += 1;
  } else if (selfTeam === (blueRounds > redRounds ? "Blue" : "Red")) {
    stats.wins += 1;
  } else {
    stats.losses += 1;
  }
};
