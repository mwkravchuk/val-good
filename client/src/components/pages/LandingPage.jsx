import { useNavigate } from "react-router-dom";
import { useState } from "react";

import styles from "./LandingPage.module.css";

const LandingPage = () => {
  
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const [username, tagline] = input.split("#");
    if (username?.trim() && tagline?.trim()) {
      navigate('/stats', { state: { username: username.trim(), tagline: tagline.trim() } });
    } else {
      alert("Please enter a valid username and tagline, in the format <username>#<tagline>.");
    }
  }

  return (
    <div className={styles.screenContainer}>
      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Username #Tagline"
            required
          />
          <button type="submit" style={{ display: "none" }} />
        </form>
        <div className={styles.example}>Example: SEN Tarik #1337</div>
      </div>
    </div>
  )
};

export default LandingPage;