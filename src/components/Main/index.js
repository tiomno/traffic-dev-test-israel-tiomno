import { useState, useEffect } from 'react'
import Form from './Form'
import SliderNav from './SliderNav'
import RegisterButton from './RegisterButton'
import bg1 from '../../assets/bg1.jpg'
import bg2 from '../../assets/bg2.jpg'
import bg3 from '../../assets/bg3.jpg'
import bg4 from '../../assets/bg4.jpg'
import styles from './index.module.sass'

const slides = [
  bg1, bg2, bg3, bg4
]

function Main () {
  const [current, setCurrent] = useState(0)
  const [intervalId, setIntervalId] = useState(0) // 0 = not init, -1 = disabled, > 0 active

  const nextSlide = () => {
    setCurrent(prevState => prevState === slides.length - 1 ? 0 : prevState + 1)
  }
  
  const handleClickPrevious = () => {
    clearInterval(intervalId)
    setIntervalId(-1) // -1 to disable the interval
    setCurrent(prevState => prevState ? prevState - 1 : slides.length - 1)
  }

  const handleClickNext = () => {
    clearInterval(intervalId)
    setIntervalId(-1) // -1 to disable the interval
    nextSlide()
  }

  useEffect(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextSlide, 5000))  
    }

    return () => {
      if (intervalId > 0) {
        clearInterval(intervalId)
      }
    }
  }, [intervalId])

  return (
    <main role="main" className={styles.main}>
      <div className={styles.slider} style={{backgroundImage: `url(${slides[current]})`}}>
        <div className={styles.content}>
          <div className={styles.message}>
            Two stunning new Townhome Releases Launching<br />Early 2021
            <RegisterButton />
          </div>
          <SliderNav
            onPrevious={handleClickPrevious}
            onNext={handleClickNext}
          />
          <Form />
        </div>
        <div style={{display: 'none'}}>
          {/* Caching slider images */}
          {slides.map((slide, index) => <img key={index} src={slide} alt="slide" />)}
        </div>
      </div>
    </main>
  )
}

export default Main
