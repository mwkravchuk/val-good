const MatchItem = ({ match }) => {
  return (
    <li>
      <p>Map: {match.meta.map.name} ...... Mode: {match.meta.mode}</p>
    </li>
  );
}

export default MatchItem;