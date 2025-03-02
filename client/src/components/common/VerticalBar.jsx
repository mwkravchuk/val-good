import styles from "./VerticalBar.module.css";

const VerticalBar = ({ color, margin, height }) => {
  return (
    <div
      className={styles.verticalBar}
      style={{ backgroundColor: color, margin: `auto ${margin}`, height: height}}>
    </div>
  );
};

export default VerticalBar;