import styles from "./GamemodeSelector.module.css";

const GamemodeSelector = ({ gamemodes, selectedMode, onSelectMode }) => {
  return (
    <div className={styles.modesContainer}>
      <div className={styles.modes}>
        {gamemodes.map((mode) => (
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