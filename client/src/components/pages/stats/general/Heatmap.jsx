import styles from "./Heatmap.module.css";

const Heatmap = ({ matches }) => {

  // Map: Date -> Num Matches Played
  const matchCounts = matches.reduce((acc, match) => {
    const date = new Date(match.meta.started_at).toISOString().split("T")[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // Generate days for current month.
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(startOfMonth);
    date.setDate(i + 1);
    const dateString = date.toISOString().split("T")[0];
    return {
      date: dateString,
      count: matchCounts[dateString] || 0,
    };
  });

  const getColor = (count) => {
    if (count === 0) return "#e0e0e0";
    const intensity = Math.min(count / 5, 1);
    return `rgba(0, 128, 0, ${intensity})`;
  };

  return (
    <div className={styles.heatmap}>
      {days.map((day) => (
        <div
          key={day.date}
          className={styles.day}
          style={{ backgroundColor: getColor(day.count) }}
          title={`${day.date}: ${day.count} matches`}
        >
          {new Date(day.date).getDate()}
        </div>
      ))}
    </div>
  );
};

export default Heatmap