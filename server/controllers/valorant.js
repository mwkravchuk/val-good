const axios = require("axios");

exports.agent = async (req, res) => {
  const { agentId } = req.params;

  try {
    const response = await axios.get(
      `https://valorant-api.com/v1/agents/${agentId}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching agent by id", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.agents = async (req, res) => {
  const { agentId } = req.params;

  try {
    const response = await axios.get(`https://valorant-api.com/v1/agents/`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching agents", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.tiers = async (req, res) => {
  try {
    const response = await axios.get(
      `https://valorant-api.com/v1/competitivetiers/`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching tiers", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.gamemodes = async (req, res) => {
  try {
    const response = await axios.get(`https://valorant-api.com/v1/gamemodes/`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching gamemodes", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.maps = async (req, res) => {
  try {
    const response = await axios.get(`https://valorant-api.com/v1/maps/`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching maps", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.map = async (req, res) => {
  const { mapId } = req.params;

  try {
    const response = await axios.get(
      `https://valorant-api.com/v1/maps/${mapId}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching map", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.content = async (req, res) => {
  const headers = {
    Authorization: process.env.HENRIK_API_KEY,
  };

  try {
    const response = await axios.get(
      "https://api.henrikdev.xyz/valorant/v1/content",
      { headers }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching content", error);
    res.status(500).send("Internal Server Error");
  }
};
