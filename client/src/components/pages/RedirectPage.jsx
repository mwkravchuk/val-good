import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserProvider";

const RedirectPage = () => {

  const { user, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/");
    } else if (user.matches.length > 0) {
      navigate("/stats");
    } else {
      navigate("/setup-riot-id")
    }
  }, [user, loading, navigate]);

  return (
    <div>Redirecting...</div>
  );
};

export default RedirectPage;