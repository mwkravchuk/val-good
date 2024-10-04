import { Link } from "react-router-dom";

import Logo from "../../assets/Logo";

import styles from "./Header.module.css";

const Header = () => {
  return(
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