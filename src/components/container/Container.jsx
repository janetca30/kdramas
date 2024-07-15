import styles from "./Container.module.css"
import PropTypes from "prop-types"

function Container({children}) {
  return (
    <section className={styles.container}>
      {children}
    </section>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container