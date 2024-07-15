import { Link } from "react-router-dom"
import styles from "./Header.module.css"
import logo from "../../assets/logo.png"
import HeaderLink from "../headerLink/HeaderLink"

function Header () {
  return (
    <header className={styles.header}>
      <Link to="/">
        <section className={styles.logoContainer}>
          <img src={logo} alt="Logo" /> <span>My Favorite Dramas</span>
        </section>
      </Link>
      <nav className={styles.nav}>
        <div className={styles.navLinks}>
          <HeaderLink url="./">HOME</HeaderLink>
          <HeaderLink url="./NewVideo">NEW VIDEO</HeaderLink>
        </div>
      </nav>
    </header>
  )
}

export default Header