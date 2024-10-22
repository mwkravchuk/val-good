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
