export const processActs = (entries) => {
  const episodes = {};
  const acts = [];

  let activeActIndex = -1;

  entries.forEach((entry, index) => {
    if (entry.type === "episode") {
      episodes[entry.id] = entry.name;
    } else {
      acts.push({
        id: entry.id,
        name: entry.name,
        isActive: entry.isActive,
        parentId: entry.parentId,
        index,
      });

      if (entry.isActive) {
        activeActIndex = index;
      }
    }
  });

  const combinedActs = acts
    .filter((act) => act.index <= activeActIndex)
    .map((act) => {
      const parentName = episodes[act.parentId];
      return {
        id: act.id,
        name: `${parentName} ${act.name}`,
        isActive: act.isActive,
      };
    });

  return combinedActs;
};
