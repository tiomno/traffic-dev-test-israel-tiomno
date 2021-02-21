import { scroller } from 'react-scroll'
import styles from './index.module.sass'

function RegisterButton () {
  const handleClick = () => {
    scroller.scrollTo('register-form', {
      duration: 500,
      delay: 0,
      smooth: 'ease'
    })
  }
  
  return <button className={`btn btn-primary ${styles.register}`} onClick={handleClick}>Register</button>
}

export default RegisterButton
