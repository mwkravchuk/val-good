import styles from "./GamemodeSelector.module.css";

const GamemodeSelector = ({ gamemodes, selectedMode, onSelectMode }) => {

  console.log("Gamemodes: ", gamemodes);
  // const [expanded, setExpanded] = useState(false);

  const primaryModes = ["All", "Competitive", "Standard", "Deathmatch", "Team Deathmatch"];
  // const additionalModes = gamemodes.filter((mode) => !primaryModes.includes(mode));

  return (
    <div className={styles.modesContainer}>
      <div className={styles.modes}>
        {/* Render primary modes */}
        {primaryModes.map((mode) => (
          <button
            key={mode}
            onClick={() => onSelectMode(mode)}
            className={styles.modeBtn}
            style={{
              borderBottomStyle: "solid",
              borderBottomWidth: "thick",
              borderBottomColor:
                selectedMode === mode ? "hsl(var(--primary-color))" : "hsl(var(--background-color))",
              fontWeight: selectedMode === mode ? "700" : "500",
            }}
          >
            {mode}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GamemodeSelector;