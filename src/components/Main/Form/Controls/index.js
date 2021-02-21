import styles from './index.module.sass'

function Control ({ children }) {
  return (
    <div className={styles.controlWrap}>
      {children}
    </div>
  )
}

export default Control
