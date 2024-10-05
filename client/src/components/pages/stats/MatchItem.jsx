import styles from "./MatchItem.module.css";

const MatchItem = ({ match }) => {
  return (
    <li className={styles.matchContainer}>
      <p>Map: {match.meta.map.name} ...... Mode: {match.meta.mode}</p>
    </li>
  );
}

export default MatchItem;