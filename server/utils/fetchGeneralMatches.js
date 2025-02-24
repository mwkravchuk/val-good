const axios = require("axios");

const fetchGeneralMatches = async (puuid) => {
  const headers = {
    Authorization: process.env.HENRIK_API_KEY,
  };

  try {
    const response = await axios.get(
      `https://api.henrikdev.xyz/valorant/v1/by-puuid/stored-matches/na/${puuid}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching matches", error);
    return [];
  }
};

module.exports = fetchGeneralMatches;
