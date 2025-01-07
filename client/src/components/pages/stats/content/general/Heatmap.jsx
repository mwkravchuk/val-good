import { useState } from "react";

import styles from "./Heatmap.module.css";

const Heatmap = ({ matches }) => {

  const [monthOffset, setMonthOffset] = useState(0);

  // Map: Date -> Num Matches Played
  const matchCounts = matches.reduce((acc, match) => {
    const date = new Date(match.meta.started_at).toISOString().split("T")[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // Generate days for current month.
  const today = new Date();
  const currentMonthDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const daysInMonth = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 0).getDate();

  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(currentMonthDate);
    date.setDate(i + 1);
    const dateString = date.toISOString().split("T")[0];
    return {
      date: dateString,
      count: matchCounts[dateString] || 0,
    };
  });

  const getColor = (count) => {
    if (count === 0) return "hsl(var(--background-color))";
    const intensity = Math.min(count / 8, 1);
    return `hsla(var(--primary-color), ${intensity})`;
  };

  const handlePreviousMonth = () => setMonthOffset((prev) => prev - 1);
  const handleNextMonth = () => setMonthOffset((prev) => prev + 1);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
          <button onClick={handlePreviousMonth}>Previous</button>
          <span className={styles.month}>
            {currentMonthDate.toLocaleString("default", { month: "long" })}{" "}
            {currentMonthDate.getFullYear()}
          </span>
          <button onClick={handleNextMonth} disabled={monthOffset === 0}>
            Next
          </button>
        </div>
      <div className={styles.heatmap}>
        {days.map((day) => (
          <div
            key={day.date}
            className={styles.day}
            style={{ backgroundColor: getColor(day.count) }}
            title={`${day.date}: ${day.count} matches`}
          >
            {parseInt(day.date.split("-")[2], 10)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Heatmap