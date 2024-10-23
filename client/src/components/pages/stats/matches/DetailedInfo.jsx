import styles from "./DetailedInfo.module.css";

const DetailedInfo = ({ mode, acs, hsp, damageDelta, damagePerRound }) => {
  return (
    <div className={styles.detailedInfo}>
        {mode !== "Deathmatch" ? (
          <>
            <span>ACS: {acs}</span>
            <span>HS%: {hsp}</span>
            <span>Damage/Round: {damagePerRound}</span>
            <span>Damage Delta: {damageDelta}</span>
          </>
        ) : (
          <span>Data not available for Deathmatch</span>
        )
      }
      </div>
  );
};

export default DetailedInfo;