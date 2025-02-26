import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../axiosConfig";

const RiotIdSetupPage = () => {

  const [username, setUsername] = useState("");
  const [tagline, setTagline] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !tagline) {
      setError("Both fields are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.post("/user/setup-riot-id", { username, tagline }, { withCredentials: true });
      console.log("Setup success:", response.data);
      navigate("/stats");

    } catch (error) {
      setError("Failed to setup Riot ID", error)
    } finally {
      setLoading(false);
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input type="text"
               value={username}
               onChange={(e) => setUsername(e.target.value)}/>
      </div>
      <div>
        <label>Tagline</label>
        <input type="text"
               value={tagline}
               onChange={(e) => setTagline(e.target.value)}/>
      </div>

      {error && <p>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Setting up..." : "Submit"}
      </button>
    </form>
  );
};

export default RiotIdSetupPage;