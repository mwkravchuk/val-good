import MatchItem from "./MatchItem";

const MatchList = ({ matches, rankTable }) => {
  return (
    <>
      <div>
        Recent matches
      </div>
      <ul>
        {matches.map((match) => (
          <MatchItem key={match.meta.id} match={match} rankTable={rankTable}/>
        ))}
      </ul>
    
    </>
  );
};

export default MatchList;