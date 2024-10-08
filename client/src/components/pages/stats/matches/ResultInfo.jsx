import styles from "./ResultInfo.module.css";

const ResultInfo = ({ victory, mode }) => {
  return (
    <div className={styles.resultInfo}>
      <span className={`${styles.resultTag} ${victory ? styles.victoryText : styles.defeatText}`}>{mode}</span>
      <span className={styles.timeAgo}> 1 hour ago </span>
    </div>
  );
};

export default ResultInfo;