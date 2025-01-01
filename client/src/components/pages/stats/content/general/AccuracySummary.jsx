import styles from "./AccuracySummary.module.css";

const AccuracySummary = ({ totals }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Last 50 games</h3>
      <div className={styles.info}>
        <div className={styles.item}>
          <span className={styles.dark}>Head</span>
          <span>
            <span className={styles.variable}>{(totals.head / totals.total).toFixed(2)}</span>
            <span className={styles.dark}>&nbsp;%</span>
          </span>
          <span>
            <span className={styles.variable}>{totals.head}</span>
            <span className={styles.dark}>&nbsp;hits</span>
          </span>
        </div>
        <div className={styles.item}>
          <span className={styles.dark}>Body</span>
          <span>
            <span className={styles.variable}>{(totals.body / totals.total).toFixed(2)}</span>
            <span className={styles.dark}>&nbsp;%</span>
          </span>
          <span>
            <span className={styles.variable}>{totals.body}</span>
            <span className={styles.dark}>&nbsp;hits</span>
          </span>
        </div>
        <div className={styles.item}>
          <span className={styles.dark}>Legs</span>
          <span>
            <span className={styles.variable}>{(totals.leg / totals.total).toFixed(2)}</span>
            <span className={styles.dark}>&nbsp;%</span>
          </span>
          <span>
            <span className={styles.variable}>{totals.leg}</span>
            <span className={styles.dark}>&nbsp;hits</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccuracySummary;