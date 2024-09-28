import MatchItem from "./MatchItem";

const MatchList = ({ matches }) => {
  return (
    <ul>
      {matches.map((match) => (
        <MatchItem key={match.metadata.match_id} match={match}/>
      ))}
    </ul>
  );
};

export default MatchList;