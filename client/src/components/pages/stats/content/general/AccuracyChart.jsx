import { LineChart, Line, YAxis, ResponsiveContainer } from "recharts";

import styles from "./AccuracyChart.module.css";

const AccuracyChart = ({ data }) => {

  const accuracies = data.map((d) => d.accuracy);
  const minValue = Math.min(...accuracies);
  const maxValue = Math.max(...accuracies);

  // Add some padding
  const padding = 5;
  const yDomain = [Math.round(minValue - padding), Math.round(maxValue + padding)];

  return (
    <div className={styles.container}>
      <div style={{ width: "90%", height: "200px" }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <YAxis domain={yDomain} label={{ value: "HS%", angle: -90, position: "insideLeft", fill: "hsl(var(--text-color))" }} tick={{ fill: "hsl(var(--text-color))", fontSize: 12 }}/>
            <Line type="monotone" dataKey="accuracy" stroke="hsl(var(--primary-color-light))" strokeWidth={3.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AccuracyChart;