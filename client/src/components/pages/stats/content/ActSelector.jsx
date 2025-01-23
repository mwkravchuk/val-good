import { processActs } from "../../../../utils/processActs";

const ActSelector = ({ acts, selectedAct, onSelectAct }) => {

  console.log(acts);
  const processedActs = processActs(acts);

  const handleChange = (e) => {
    const selectedId = e.target.value;
    onSelectAct(selectedId);
  };

  return (
    <select value={selectedAct} onChange={handleChange}>
      {processedActs.map((act) => (
        <option key={act.id} value={act.id}>{act.name}</option>
      ))}
    </select>
  );
};

export default ActSelector;