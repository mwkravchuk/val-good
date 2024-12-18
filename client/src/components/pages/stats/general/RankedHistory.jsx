import { useState } from "react";

const RankedHistory = ({ playerMMR, height }) => {
  const [showAll, setShowAll] = useState(false);
  const sortedMMR = playerMMR && playerMMR.seasonal ? [...playerMMR.seasonal].reverse() : [];
  const visibleMMR = showAll ? sortedMMR : sortedMMR.slice(0, 5);

  return (
    <div style={{ height }}>
      <h2>Ranked history</h2>
      <ul>
        {visibleMMR.map((seasonData, index) => (
          <li key={index}>
            <span>{seasonData.season.short}</span>
            <span>{seasonData.end_tier.name}</span>
          </li>
        ))}
      </ul>
      {sortedMMR.length > 5 && (
        <button onClick={() => setShowAll((prev) => !prev)}>
          {showAll ? "Show less" : "Show all"}
        </button>
      )}
    </div>
  );
};

export default RankedHistory;