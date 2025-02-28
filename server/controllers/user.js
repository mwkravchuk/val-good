const axios = require("axios");

exports.currentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.json({
      username: req.user.username,
      tagline: req.user.tagline,
      matches: req.user.matches || [],
    });
  } catch (error) {
    console.error("Error fetching user's matches:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.setupRiotId = async (req, res) => {
  console.log("setupRiotId called with:", req.body);

  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    console.log("setting up riot Id.");

    const { username, tagline } = req.body;
    if (!username || !tagline) {
      return res
        .status(400)
        .json({ message: "Username and tagline are required" });
    }

    const puuidResponse = await axios.get(
      `${process.env.API_BASE_URL}/player/puuid`,
      {
        params: { username, tagline },
      }
    );

    const puuid = puuidResponse.data.data.puuid;
    if (!puuid) return res.status(404).json({ message: "PUUID not found" });

    const matchesResponse = await axios.get(
      `${process.env.API_BASE_URL}/player/matches/${puuid}`
    );
    const matches = matchesResponse.data.matches.data;
    console.log(
      "matches response.data.matches.data: ",
      matchesResponse.data.matches.data
    );

    req.user.username = username;
    req.user.tagline = tagline;
    req.user.puuid = puuid;
    req.user.matches = matches;
    await req.user.save();

    res.json({ message: "Riot ID setup complete", puuid, matches });
  } catch (error) {
    console.error("Error setting up Riot ID:", error);
    res.status(500).json({ error: "Server error" });
  }
};
