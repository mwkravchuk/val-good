import styles from "./HorizontalBar.module.css";

const HorizontalBar = ({ color, margin, width }) => {
  return (
    <div
      className={styles.horizontalBar}
      style={{ backgroundColor: color, margin: `${margin} 0`, width: width}}>
    </div>
  );
};

export default HorizontalBar;