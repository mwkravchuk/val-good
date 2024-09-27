import { useLocation } from "react-router-dom";

const StatsPage = () => {

  const location = useLocation();
  const { username, tagline } = location.state || {};

  return (
    <>
      <div>
        <h1>Stats Page</h1>
        <p>{username}</p>
        <p>{tagline}</p>
      </div>
    </>
  );
}

export default StatsPage;