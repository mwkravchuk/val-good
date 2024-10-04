import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LandingPage = () => {
  
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [tagline, setTagline] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/stats', { state: { username, tagline } });
  }

  return (
    <>
      <h1>Valorant</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
          />
        </div>
        <div>
          <input type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Tagline"
                  required
            />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  )
};

export default LandingPage;