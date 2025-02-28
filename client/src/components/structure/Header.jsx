import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "../../../axiosConfig";

import Logo from "../../assets/Logo";
import styles from "./Header.module.css";

const Header = () => {

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

  return (
    <header className={styles.header}>
      <div className={styles.left}></div>
      <div className={styles.middle}>
        <div className={styles.logoWrapper}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
      </div>
      <div className={styles.right}>
        <div>
          { user ? (
            <img src={user.displayIcon} style={{ height: 20, width: 20}}alt="" />
          ) : (
            <button onClick={handleLogin}>Login With Google</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;