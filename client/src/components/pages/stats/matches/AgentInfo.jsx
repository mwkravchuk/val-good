import styles from "./AgentInfo.module.css";

const AgentInfo = () => {
  return (
    <div className={styles.agentInfo}>
      <img src="agent.png" alt="" />
      <span>KDA</span>
      <span>HS%</span>
    </div>
  );
};

export default AgentInfo;