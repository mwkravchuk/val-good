import styles from "./DetailedInfo.module.css";

const DetailedInfo = ({ acs, damageDelta, damagePerRound }) => {
  return (
    <div className={styles.detailedInfo}>
        <span>ACS: {acs}</span>
        <span>Damage/Round: {damagePerRound}</span>
        <span>Damage Delta: {damageDelta}</span>
      </div>
  );
};

export default DetailedInfo;