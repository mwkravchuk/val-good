import MatchItem from "./matches/MatchItem";

import { GlobalData } from "../../../../contexts/GlobalDataProvider";

const MatchList = ({ matches }) => {

  const { maps, tiers } = GlobalData();
  const rankTable = tiers[tiers.length - 1];

  return (
    <>
      <ul>
        {matches.map((match) => (
          <MatchItem key={match.meta.id} match={match} rankTable={rankTable} maps={maps}/>
        ))}
      </ul>
    </>
  );
};

export default MatchList;