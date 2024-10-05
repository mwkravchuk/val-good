import styles from "./StatsHead.module.css";

const StatsHead = ({ playerInfo }) => {
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.infoContainer}>
          {playerInfo[0]} #{playerInfo[1]}
        </div>
      </div>
    </div>
  );
};

export default StatsHead;