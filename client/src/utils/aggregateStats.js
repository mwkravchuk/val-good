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
    maps: {},
    agents: {},
    bestMap: null,
    bestAgent: null,
    favoriteAgent: null,
  };

  matches.forEach((match) => {
    const result = updateWinsLosses(match, stats);
    const map = match.meta.map.name;
    const agent = match.stats.character.name;
    updateMapStats(map, result, stats.maps);
    updateAgentStats(agent, result, stats.agents);

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

  updateBestStats(stats);

  return stats;
};

const updateWinsLosses = (match, stats) => {
  const { blue: blueRounds, red: redRounds } = match.teams;
  const selfTeam = match.stats.team; // "Blue" or "Red"
  let result = "";
  if (blueRounds === redRounds) {
    stats.draws += 1;
    result = "draw";
  } else if (selfTeam === (blueRounds > redRounds ? "Blue" : "Red")) {
    stats.wins += 1;
    result = "win";
  } else {
    stats.losses += 1;
    result = "loss";
  }
  return result;
};

const updateAgentStats = (agent, result, agents) => {
  if (!agents[agent]) {
    agents[agent] = { wins: 0, losses: 0, draws: 0, games: 0 };
  }
  agents[agent].games += 1;
  if (result == "win") {
    agents[agent].wins += 1;
  } else if (result == "loss") {
    agents[agent].losses += 1;
  } else {
    agents[agent].draws += 1;
  }
};

const updateMapStats = (map, result, maps) => {
  if (!maps[maps]) {
    maps[map] = { wins: 0, losses: 0, draws: 0, games: 0 };
  }
  maps[map].games += 1;
  if (result == "win") {
    maps[map].wins += 1;
  } else if (result == "loss") {
    maps[map].losses += 1;
  } else {
    maps[map].draws += 1;
  }
};

const updateBestStats = (stats) => {
  stats.bestMap = Object.keys(stats.maps).reduce((best, map) => {
    const { wins, games } = stats.maps[map];
    const winRate = games ? wins / games : 0;
    if (!best || winRate > best.winRate) {
      return { map, winRate: Math.round(winRate * 100) };
    }
    return best;
  }, null);

  stats.bestAgent = Object.keys(stats.agents).reduce((best, agent) => {
    const { wins, games } = stats.agents[agent];
    const winRate = games ? wins / games : 0;
    if (!best || winRate > best.winRate) {
      return { agent, winRate: Math.round(winRate * 100) };
    }
    return best;
  }, null);

  stats.favoriteAgent = Object.keys(stats.agents).reduce((favorite, agent) => {
    const { games } = stats.agents[agent];
    const playRate = games / stats.totalGames;
    if (!favorite || games > favorite.games) {
      return { agent, games, playRate: Math.round(playRate * 100) };
    }
    return favorite;
  }, null);
};
