import axios from "../../axiosConfig";

const excludedModes = [
  "Bot Match",
  "Basic Training",
  "Onboarding",
  "The Range",
];

export const fetchAgents = async () => {
  const response = await axios.get("/valorant/agents");
  return response.data.data;
};

export const fetchTiers = async () => {
  const response = await axios.get("/valorant/tiers");
  return response.data.data;
};

export const fetchGamemodes = async () => {
  const response = await axios.get(`/valorant/gamemodes/`);
  let playableGamemodes = response.data.data
    .filter((mode) => !excludedModes.includes(mode.displayName))
    .map((mode) => mode.displayName);

  if (!playableGamemodes.includes("Competitive")) {
    playableGamemodes = ["Competitive", ...playableGamemodes];
  } // Not in Api call for some reason

  return ["All", ...playableGamemodes];
};
