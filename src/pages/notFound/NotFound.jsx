import styles from "./NotFound.module.css"
import error404 from "../../assets/error404.png"

function NotFound () {
  return (
    <section className={styles.container}>
      <img src={error404} alt="404" className={styles.error404} />
      <h2 className={styles.error}>404</h2>
      <p className={styles.textError}>Page not found</p>
    </section>
  )
}

export default NotFound