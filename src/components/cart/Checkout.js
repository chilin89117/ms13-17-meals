import {useState} from 'react'
import styles from './Checkout.module.css'

// helper method to check if input is at least certain length
const check = (value, num) => value.trim().length >= num

const Checkout = ({onCancel, onSubmitOrder}) => {    // props from Cart.js
  // set all inputs in invalid state
  const [inputsValid, setInputsValid] = useState({
    name: false, street: false, postal: false, city: false
  })
  
  // set all inputs as untouched
  const [inputsTouched, setInputsTouched] = useState({
    name: false, street: false, postal: false, city: false
  })
  
  // initialize form to be invalid then update when component is reevaluated
  let formIsValid = false
  if (inputsValid.name && inputsValid.street && inputsValid.postal && inputsValid.city) formIsValid = true
  
  // update state on onBlur event
  const inputBlurHandler =  event => setInputsTouched(prevState => {
    const inputName = event.target.id           // name, street, postal, or city
    return {...prevState, [inputName]: true}
  })
  
  // update state on onchange event
  const inputChangeHandler = event => setInputsValid(prevState => {
    const inputName = event.target.id           // name, street, postal, or city
    const inputValue = event.target.value
    const minLength = event.target.minLength    // minlength attribute of input
    return {...prevState, [inputName]: check(inputValue, minLength)}
  })
  
  // when Confirm button is clicked to submit form, pass data to parent Cart.js
  const submitHandler = event => {
    event.preventDefault()
    if (!formIsValid) return
    onSubmitOrder({
      name: event.target.name.value,
      street: event.target.street.value,
      postal: event.target.postal.value,
      city: event.target.city.value
    })
  }
  // add 'invalid' class to input and label if input value is not valid and input has been touched
  const inputCssClass = inputName => {
    if (!inputsValid[inputName] && inputsTouched[inputName]) return `${styles.control} ${styles.invalid}`
    else return `${styles.control}`
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={inputCssClass('name')}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          minLength='2'
          onBlur={inputBlurHandler}
          onChange={inputChangeHandler}
        />
        {!inputsValid.name && inputsTouched.name && <p className={styles.errtxt}>Must be at least 2 characters.</p>}
      </div>
      <div className={inputCssClass('street')}>
        <label htmlFor='street'>Street</label>
        <input
          type='text'
          id='street'
          minLength='5'
          onBlur={inputBlurHandler}
          onChange={inputChangeHandler}
        />
        {!inputsValid.street && inputsTouched.street && <p className={styles.errtxt}>Must be at least 5 characters.</p>}
      </div>
      <div className={inputCssClass('postal')}>
        <label htmlFor='postal'>Postal Code</label>
        <input
          type='text'
          id='postal'
          minLength='5'
          onBlur={inputBlurHandler}
          onChange={inputChangeHandler}
        />
        {!inputsValid.postal && inputsTouched.postal && <p className={styles.errtxt}>Must be at least 5 characters.</p>}
      </div>
      <div className={inputCssClass('city')}>
        <label htmlFor='city'>City</label>
        <input
          type='text'
          id='city'
          minLength='2'
          onBlur={inputBlurHandler}
          onChange={inputChangeHandler}
        />
        {!inputsValid.city && inputsTouched.city && <p className={styles.errtxt}>Must be at least 2 characters.</p>}
      </div>
      <div className={styles.actions}>
        <button type='button' onClick={onCancel}>Cancel</button>
        {formIsValid && <button type='submit' className={styles.button}>Confirm</button>}
      </div>
    </form>
  )
}

export default Checkout
