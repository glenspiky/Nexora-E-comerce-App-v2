import styles from "./Navbar.module.css";
import HelpMenu from "./HelpMenu";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";

export default function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>

       
        <div className={styles.searchWrapper}>
          <SearchBar />
        </div>

        
        <div className={styles.actions}>
          <HelpMenu />
          <UserActions />
        </div>
      </div>
    </header>
  );
}
