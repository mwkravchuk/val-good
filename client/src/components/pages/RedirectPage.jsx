import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../axiosConfig";

const RedirectPage = () => {

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("user/current-user", {
          withCredentials: true,
        });
        const user = response.data;
        navigate(user.puuid ? "/stats" : "/setup-riot-id");
      } catch (error) {
        console.error("Error fetching user", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  });

  return (
    <div>Loading...</div>
  );
};

export default RedirectPage;