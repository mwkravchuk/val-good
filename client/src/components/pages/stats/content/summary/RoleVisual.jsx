import { GlobalData } from "../../../../../contexts/GlobalDataProvider";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

import styles from "./RoleVisual.module.css";

const RoleVisual = ({ stats }) => {

  const { agents } = GlobalData();

  const gamesPerRole = {
    Duelist: { games: 0, icon: null },
    Initiator: { games: 0, icon: null },
    Sentinel: { games: 0, icon: null },
    Controller: { games: 0, icon: null },
  };

  // Get icons for each role
  agents.forEach((agent) => {
    if (agent.role) {
      const { displayName: roleName, displayIcon } = agent.role;

      if (gamesPerRole[roleName] && !gamesPerRole[roleName].icon) {
        gamesPerRole[roleName].icon = displayIcon;
      }
    }
  });

  // Count the number of games per each role
  for (const agentName in stats.agents) {
    const games = stats.agents[agentName].games;
    const agentData = agents.find((agent) => agent.displayName === agentName);

    if (agentData && agentData.role) {
      const { displayName: roleName } = agentData.role; // Role of the agent
      gamesPerRole[roleName].games += games;
    }
  }

  // Convert role data to an array suitable for Recharts
  const data = Object.entries(gamesPerRole).map(([role, { games, icon }]) => ({
    role,
    games,
    icon,
  }));

  const totalGames = data.reduce((sum, role) => sum + role.games, 0);

  const normalizedData = data.map((role) => ({
    ...role,
    games: totalGames > 0 ? (role.games / totalGames) * 100 : 0, // Normalize and convert to percentage
  }));

  console.log("games per role:", gamesPerRole);

  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%">
        <BarChart data={normalizedData} layout="vertical" margin={{ left: -20, top: 10, bottom: 10, right: 20}}>
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis type="category" dataKey="role" tickLine={false} axisLine={false} tick={
            ({ x, y, payload }) => {
              const role = normalizedData.find((d) => d.role === payload.value);
              return (
                <foreignObject x={x - 15} y={y - 10} width={30} height={30}>
                  {role?.icon && <img src={role.icon} alt={payload.value} style={{ width: "15px", height: "15px"}} />}
                </foreignObject>
              );  
            }}
          />
          <Bar dataKey="games" fill="hsl(var(--primary-color))" background={{ fill: "hsla(var(--primary-color), 20%)" }}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RoleVisual;