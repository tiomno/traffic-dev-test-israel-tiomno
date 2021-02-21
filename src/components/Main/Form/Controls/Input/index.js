import PropTypes from 'prop-types'
import controlStyles from '../index.module.sass'

function Input ({ name = '', defaultValue = '', placeholder = '', highlightError = false, onChange }) {
  return (
    <input
      className={`${controlStyles.control} ${highlightError ? controlStyles.error : ''}`}
      name={name}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}

Input.propTypes = {
  name: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  highlightError: PropTypes.bool,
  onChange: PropTypes.func
}

export default Input
