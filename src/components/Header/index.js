import logo from '../../assets/logo.svg'
import styles from './index.module.sass'
import HeaderNav from './HeaderNav'

function Header () {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <img className={styles.logo} src={logo} alt="Eliston" />
        <HeaderNav />
      </div>
    </header>
  )
}

export default Header
