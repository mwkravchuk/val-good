import { Link } from "react-router-dom";

import Logo from "../../assets/Logo";

import styles from "./Header.module.css";

const Header = () => {

  const handleLogin = (e) => {
    e.preventDefault();
    window.open("http://localhost:4000/api/auth/google", "_self");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <button onClick={handleLogin}>Login With Google</button>
    </header>
  );
};

export default Header;