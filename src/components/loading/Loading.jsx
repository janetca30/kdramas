import styles from "./Loading.module.css"
import load from "../../assets/load.gif"

function Loading () {
  return(
    <div className={styles.container} >
      <img src={load} alt="load" />
    </div>
  )
}

export default Loading