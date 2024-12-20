import { GlobalData }  from "../../../../contexts/GlobalDataProvider";

import styles from "./RankedTable.module.css";

const RankedTable = ({ visibleMMR }) => {

  const { tiers } = GlobalData();
  const rankTable = tiers[tiers.length - 1];

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Season</th>
          <th>Rank</th>
          <th># Games</th>
        </tr>
      </thead>
      <tbody>
        {visibleMMR.map((seasonData, index) => (
          <tr key={index} className={styles.seasonRow}>
            <td className={styles.seasonColumn}>{seasonData.season.short}</td>
            <td className={styles.rankColumn}>
              <img src={rankTable.tiers[seasonData.end_tier.id].smallIcon}
                  alt="Rank Icon"
                  className={styles.rankImage}/>
              <span>{seasonData.end_tier.name}</span>
            </td>
            <td className={styles.gamesColumn}>{seasonData.games}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RankedTable;