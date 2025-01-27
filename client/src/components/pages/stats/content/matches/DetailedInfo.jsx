import styles from "./DetailedInfo.module.css";

const DetailedInfo = ({ mode, kda, hsp, acs, damageDelta, damagePerRound }) => {
  return (
    <div className={styles.detailedInfo}>
        {mode !== "Deathmatch" ? (
          <ul>
            <li><span className={styles.label}>KDA&nbsp;</span><span className={styles.value}>{kda}</span></li>
            <li><span className={styles.label}>HS%&nbsp;</span><span className={styles.value}>{hsp}</span></li>
            <li><span className={styles.label}>ACS&nbsp;</span><span className={styles.value}>{acs}</span></li>
            <li><span className={styles.label}>D/R&nbsp;</span><span className={styles.value}>{damagePerRound}</span></li>
            <li><span className={styles.label}>D&Delta;&nbsp;</span><span className={styles.value}>{damageDelta}</span></li>
          </ul>
        ) : (
          <span className={styles.errorMsg}>Data not available for Deathmatch</span>
        )
      }
    </div>
  );
};

export default DetailedInfo;