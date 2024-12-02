import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const WinLossCircle = ({ wins, losses }) => {
  const total = wins + losses;
  const winPercentage = (wins / total) * 100;

  return (
    <div style={{ width: 100, height: 100 }}>
      <CircularProgressbar
        value={winPercentage}
        text={`${wins}W ${losses}L`}
        styles={{
          pathColor: 'green',
          textColor: '#000',
          trailColor: 'red',
        }}
      />
    </div>
  );
};

export default WinLossCircle;
