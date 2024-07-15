import styles from "./Footer.module.css"
import Networks from "./networks/Networks"
import logo from "../../assets/logo.png"
import foot from "../../assets/foot.png"

function Footer (){
  return(
    <footer className={styles.footer}>
      <img src={logo} alt="Logo" className={styles.logo}/>
      <Networks />
      <div className={styles.presentation}>
        <img src={foot} alt="Foot" className={styles.footImage}/>
        <span>&copy; 2024 - Janet Calderon Acuña de Denis - All Rights Reserved</span>
      </div>
    </footer>
  )
}

export default Footer