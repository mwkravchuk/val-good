import styles from "./DetailedInfo.module.css";

const DetailedInfo = ({ mode, acs, damageDelta, damagePerRound }) => {
  return (
    <div className={styles.detailedInfo}>
        {mode !== "Deathmatch" ? (
          <table className={styles.table}>
            <tr>
              <th>ACS</th>
              <th>D/R</th>
              <th>D&Delta;</th>
            </tr>
            <tr>
              <td className={styles.value}>{acs}</td>
              <td className={styles.value}>{damagePerRound}</td>
              <td className={styles.value}>{damageDelta}</td>
            </tr>
          </table>
        ) : (
          <span className={styles.errorMsg}>Data not available for Deathmatch</span>
        )
      }
      </div>
  );
};

export default DetailedInfo;