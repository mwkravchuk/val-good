const fetchGeneralMatches = require("../utils/fetchGeneralMatches");
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

  try {
    if (req.user) {
      if (req.user.matches.length > 0) {
        return res.json({ matches: req.user.matches });
      }

      const matches = await fetchGeneralMatches(puuid);
      req.user.matches = matches;
      await req.user.save();
      return res.json({ matches });
    } else {
      const generalMatches = await fetchGeneralMatches(puuid);
      return res.json({ matches: generalMatches });
    }
  } catch (error) {
    console.error("Error fetching matches", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.mmr = async (req, res) => {
  const { puuid } = req.params;
  const headers = {
    Authorization: process.env.HENRIK_API_KEY,
  };

  try {
    const response = await axios.get(
      `https://api.henrikdev.xyz/valorant/v3/by-puuid/mmr/na/pc/${puuid}`,
      { headers }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching player mmr", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.card = async (req, res) => {
  const { playercardUuid } = req.params;

  try {
    const response = await axios.get(
      `https://valorant-api.com/v1/playercards/${playercardUuid}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching player card", error);
    res.status(500).send("Internal Server Error");
  }
};
