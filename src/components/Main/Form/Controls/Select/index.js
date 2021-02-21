import { useState } from 'react'
import PropTypes from 'prop-types'
import controlStyles from '../index.module.sass'
import styles from './index.module.sass'

const options = [
  'As soon as possible',
  'In a year',
  'Not sure yet'
]

function Select ({ name = '', defaultValue = '', onChange }) {
  const [dropdownActive, setDropdownActive] = useState(false)

  const handleDropdownClick = () => {
    setDropdownActive(prevDropdownActive => !prevDropdownActive)
  }

  const handleItemClick = (option) => () => {
    onChange(option)
    setDropdownActive(false)
  }

  const dropdownListClassName = `${styles.dropdownMenu} ${dropdownActive ? styles.active : ''}`

  return (
    <div className={`${controlStyles.control} ${styles.dropdown}`}>
      <button
        className={`${styles.dropdownToggle}`}
        aria-haspopup="true"
        aria-expanded="false"
        type="button"
        onClick={handleDropdownClick}
      >
        {defaultValue ? defaultValue : 'When are you looking to buy'}
      </button>
      <div className={dropdownListClassName}>
        {options.map((option, index) => (
          <span key={index} className={styles.dropdownItem} onClick={handleItemClick(option)}>{option}</span>
        ))}
      </div>
      <select name={name} defaultValue={defaultValue} style={{ display: 'none' }}>
        {options.map((option, index) => <option key={index} value={option}>{option}</option>)}
      </select>
    </div>
  )  
}

Select.propTypes = {
  name: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func
}

export default Select
