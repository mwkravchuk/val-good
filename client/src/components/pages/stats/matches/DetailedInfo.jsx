import styles from "./DetailedInfo.module.css";

const DetailedInfo = () => {
  return (
    <div className={styles.detailedInfo}>
        <span>ACS</span>
        <span>Damage/Round</span>
        <span>Damage Delta</span>
      </div>
  );
};

export default DetailedInfo;