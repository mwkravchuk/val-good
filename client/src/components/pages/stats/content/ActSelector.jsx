import { useEffect, useRef } from "react";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import { processActs } from "../../../../utils/processActs";

const ActSelector = ({ acts, selectedActId, onSelectActId }) => {
  
  const processedActs = processActs(acts).reverse();
  const activeAct = processedActs.find((act) => act.isActive);

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current && activeAct) {
      onSelectActId(activeAct.id); // Set default act only on first render
      isFirstRun.current = false; // Mark as not the first run anymore
    }
  }, [activeAct, onSelectActId]);

  const handleChange = (e) => {
    const newSelectedAct = e.target.value;
    onSelectActId(newSelectedAct); // Notify parent
  }

  return (
    <FormControl sx={{ m:1, minWidth: 200 }} size="small">
      <InputLabel sx={{
        color: "hsl(var(--background-color-dark))", // Default label color
        "&.Mui-focused": {
          color: "hsl(var(--primary-color))", // Prevent blue on focus
      },
    }}>ACT</InputLabel>
      <Select
        value={selectedActId}
        label="ACT"
        onChange={handleChange}
        sx={{
          borderColor: "hsl(var(--background-color-med))", // Custom border color
          color: "hsl(var(--primary-color-light))",               // Text color
          "& .MuiOutlinedInput-notchedOutline": {           // Styles the border
            borderColor: "hsl(var(--background-color-med))",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {     // On hover
            borderColor: "hsl(var(--primary-color))",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { // On focus
            borderColor: "hsl(var(--primary-color))",
          },
          "& .MuiSelect-select": {                          // Styles the select text
            color: "hsl(var(--primary-color))",
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: 200, // Adjust the height of the dropdown
              overflow: 'auto', // Allow scrolling if there are more items than visible
            }
          }
        }}
      >
        {processedActs.map((act) => (
         <MenuItem key={act.id} value={act.id}>{act.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ActSelector;