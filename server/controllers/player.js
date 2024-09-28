const axios = require("axios");

exports.puuid = async (req, res) => {
  const { username, tagline } = req.query;
  const headers = {
    Authorization: process.env.HENRIK_API_KEY,
  };

  try {
    const response = await axios.get(
      `https://api.henrikdev.xyz/valorant/v2/account/${username}/${tagline}`,
      { headers }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching puuid:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.matches = async (req, res) => {
  const { puuid } = req.params;
  const headers = {
    Authorization: process.env.HENRIK_API_KEY,
  };

  try {
    const response = await axios.get(
      `https://api.henrikdev.xyz/valorant/v4/by-puuid/matches/na/pc/${puuid}`,
      { headers }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching matches", error);
    res.status(500).send("Internal Server Error");
  }
};
