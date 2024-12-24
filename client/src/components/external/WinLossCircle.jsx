import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const WinLossCircle = ({ wins, losses }) => {
  const total = wins + losses;
  const winPercentage = (wins / total) * 100;

  return (
    <div style={{ width: 100, height: 100 }}>
      <CircularProgressbar
        value={winPercentage}
        text={`${Math.round(winPercentage)}%`}
        strokeWidth={16}
        styles={buildStyles({
          pathColor: 'hsl(var(--victory-color))', // Progress color
          trailColor: 'hsl(var(--defeat-color))', // Background trail color
          textColor: 'hsl(var(--victory-color))', // Text color
          strokeLinecap: 'butt',
          textSize: 16,
        })}
      />
    </div>
  );
};

export default WinLossCircle;