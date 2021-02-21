import styles from './index.module.sass'
import leftArrow from '../../../assets/left-arrow.svg'
import rightArrow from '../../../assets/right-arrow.svg'

function SliderNav ({ onPrevious, onNext }) {
  return (
    <div className={styles.nav}>
      <span onClick={onPrevious}>
        <img src={leftArrow} alt="previous slide" />
      </span>
      <span onClick={onNext}>
        <img src={rightArrow} alt="next slide" />
      </span>
    </div>
  )
}

export default SliderNav
