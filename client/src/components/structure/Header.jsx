import { Link } from "react-router-dom";

import Logo from "../../assets/Logo";
import styles from "./Header.module.css";

const Header = () => {

  /*
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/auth/user", { withCredentials: true });
        console.log("data header", data.user);
        setUser(data.user);
      } catch (error) {
        console.log("Error fetching user", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    window.open("http://localhost:4000/api/auth/google", "_self");
  };
  */

  return (
    <header className={styles.header}>
        <div className={styles.logoWrapper}>
          <Link to="/">
            <Logo />
          </Link>
      </div>
    </header>
  );
};

export default Header;