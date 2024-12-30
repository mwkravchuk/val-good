import styles from "./DetailedInfo.module.css";

const DetailedInfo = ({ mode, kda, hsp, acs, damageDelta, damagePerRound }) => {
  return (
    <div className={styles.detailedInfo}>
        {mode !== "Deathmatch" ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>KDA</th>
                <th>HS%</th>
                <th>ACS</th>
                <th>D/R</th>
                <th>D&Delta;</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.value}>{kda}</td>
                <td className={styles.value}>{hsp}</td>
                <td className={styles.value}>{acs}</td>
                <td className={styles.value}>{damagePerRound}</td>
                <td className={styles.value}>{damageDelta}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <span className={styles.errorMsg}>Data not available for Deathmatch</span>
        )
      }
    </div>
  );
};

export default DetailedInfo;