import { useState, useEffect } from 'react'
import isEmpty from 'validator/lib/isEmpty'
import isEmail from 'validator/lib/isEmail'
import Control from './Controls'
import Input from './Controls/Input'
import Select from './Controls/Select'
import Checkbox from './Controls/Checkbox'
import styles from './index.module.sass'
import { formspree } from '../../../config.json'

function validateForm ({ firstname, email, phone }) {
  const errors = {
    firstname: isEmpty(firstname),
    email: isEmpty(email) || !isEmail(email),
    phone: isEmpty(phone)
  }

  return {
    valid: !Object.values(errors).find(Boolean),
    errors
  }
}

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    cache: 'no-cache',
    credentials: 'omit',
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  })

  return response.json()
}

function Form () {
  const initValues = () => {
    const storedValues = window.sessionStorage.getItem('values')

    if (storedValues) {
      return JSON.parse(storedValues)
    }

    return {
      firstname: '',
      email: '',
      phone: ''
    }
  }

  const initWhenBuying = () => window.sessionStorage.getItem('whenBuying') || ''

  const initServices = () => {
    const storedServices = window.sessionStorage.getItem('services')

    if (storedServices) {
      return JSON.parse(storedServices)
    }

    return Object.fromEntries([...Array(8)].map((_, index) => [`value${index + 1}`, false]))
  }

  const [values, setValues] = useState(initValues)
  const [whenBuying, setWhenBuying] = useState(initWhenBuying)
  const [services, setServices] = useState(initServices)
  const [highlightErrors, setHighlightErrors] = useState({
    firstname: false,
    email: false,
    phone: false
  })

  useEffect(() => {
    window.sessionStorage.setItem('values', JSON.stringify(values))
    window.sessionStorage.setItem('whenBuying', whenBuying)
    window.sessionStorage.setItem('services', JSON.stringify(services))
  }, [values, whenBuying, services])

  const handleSubmit = (e) => {
    e.preventDefault()
    const { valid, errors } = validateForm(values)

    setHighlightErrors(errors)

    if (!valid) {
      return false
    }

    postData(formspree, {
      ...values,
      whenBuying,
      ...services
    }).then(data => {
      console.log(data)
    }).catch((e) => {
      console.error(e.message)
    })

    return false
  }

  const handleReset = () => {
    // Clean up custom controls
    setWhenBuying('')
  }

  const handleSelectChange = (value) => {
    setWhenBuying(value)
  }

  const handleCheckboxChange = ({ target: { name, checked } }) => {
    setServices(prevServices => ({
      ...prevServices,
      [name]: checked
    })
    )
  }

  const handleInputChange = ({ target: { name, value } }) => {
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }))
  }

  const activeServices = Object.values(services).filter(Boolean).length
  const canSubmit = activeServices > 1 && activeServices < 6

  return (
    <div id="register-form" className={styles.form}>
      <p className={styles.header}>Be the first to register for new townhome releases for first option</p>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <Control>
          <Input
            name="firstname"
            defaultValue={values.firstname}
            placeholder="First name*"
            highlightError={highlightErrors.firstname}
            onChange={handleInputChange}
          />
        </Control>
        <Control>
          <Input
            name="email"
            defaultValue={values.email}
            placeholder="Email*"
            highlightError={highlightErrors.email}
            onChange={handleInputChange}
          />
        </Control>
        <Control>
          <Input
            name="phone"
            defaultValue={values.phone}
            placeholder="Phone number*"
            highlightError={highlightErrors.phone}
            onChange={handleInputChange}
          />
        </Control>
        <Control>
          <Select name="when-buying" defaultValue={whenBuying} onChange={handleSelectChange} />
        </Control>
        {[...Array(8)].map((_, index) => (
          <Control key={index}>
            <Checkbox
              name={`value${index + 1}`}
              label={`Value ${index + 1}`}
              checked={services[`value${index + 1}`]}
              onChange={handleCheckboxChange}
            />
          </Control>
        ))}
        <p className={`${styles.warning} ${canSubmit ? '' : styles.showWarning}`}>
          Please select from two to five services
        </p>
        <div className={styles.buttonsGroup}>
          <button
            className={`btn btn-primary ${styles.formButton}`}
            type="submit"
            disabled={!canSubmit}
          >
            Submit
          </button>
          <button
            className={`btn btn-default ${styles.formButton}`}
            type="reset">
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}

export default Form
