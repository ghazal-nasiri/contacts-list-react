import { Link } from "react-router-dom"
import styles from "./404.module.css"
function PageNotFound() {
  return (
    <div className={styles.container}>
        <p className={styles.title}>404</p>
        <p className={styles.text}>PAGE NOT FOUND</p>
        <Link to="/">Home</Link>
    </div>
  )
}

export default PageNotFound
