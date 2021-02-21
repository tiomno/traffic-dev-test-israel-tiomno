import PropTypes from 'prop-types'
import styles from './index.module.sass'

function Checkbox ({ name = '', label = '', checked = false, onChange }) {
  return (
    <>
      <input
        id={name}
        className={styles.checkbox}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label className={styles.label} htmlFor={name}>{label}</label>
    </>
  )
}

Checkbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func
}

export default Checkbox
