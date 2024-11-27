import { useState, useEffect} from "react";
import axios from "../../../../../axiosConfig";

import styles from "./AgentInfo.module.css";

const AgentInfo = ({ kills, deaths, assists, agentId }) => {

  const [agent, setAgent] = useState(null);

  useEffect(() => {
    if (agentId) {
      const fetchAgentImage = async () => {
        try {
          const agentResponse = await axios.get(`/valorant/agent/${agentId}`);
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
      <div className={styles.agent}>
        {agent ? (
          <img src={agent.displayIconSmall} alt={agent.displayName} className={styles.agentIcon}/>
        ) : (
          <p>Loading agent...</p> // Optional loading message
        )}
        <span className={styles.wideKDA}>
          <span className={styles.kills}>{kills}</span>&nbsp;/&nbsp; 
          <span className={styles.deaths}>{deaths}</span>&nbsp;/&nbsp;
          <span className={styles.assists}>{assists}</span>
        </span>
      </div>
    </div>
  );
};

export default AgentInfo;