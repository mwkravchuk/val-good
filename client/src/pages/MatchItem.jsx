const MatchItem = ({ match }) => {
  return (
    <li>
      <p>Map: {match.metadata.map.name}</p>
    </li>
  );
}

export default MatchItem;