import { useState, useEffect} from "react";
import axios from "../../../../../axiosConfig";

import styles from "./AgentInfo.module.css";

const AgentInfo = ({ mode, hsp, kills, deaths, assists, agentId }) => {

  const [agent, setAgent] = useState(null);

  useEffect(() => {
    if (agentId) {
      const fetchAgentImage = async () => {
        try {
          const agentResponse = await axios.get(`/valorant/agent/${agentId}`);
          console.log(agentResponse.data.data);
          setAgent(agentResponse.data.data);
        } catch (error) {
            console.error("Error fetching card art", error);
        }
      }
      fetchAgentImage();
    }
  }, [agentId]);

  return (
    <div className={styles.agentInfo}>
      {agent ? (
        <img src={agent.displayIconSmall} alt={agent.displayName} />
      ) : (
        <p>Loading agent...</p> // Optional loading message
      )}
      <span>{kills} / {deaths} / {assists}</span>
      {mode !== "Deathmatch" && (
        <span>HS%: {hsp}</span>
      )}
    </div>
  );
};

export default AgentInfo;