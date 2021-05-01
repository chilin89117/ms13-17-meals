import {useRef, useState} from 'react'
import Input from '../../ui/Input'
import styles from './MealItemForm.module.css'

const MealItemForm = ({onAddToCart}) => {               // props from MealItem.js
  const qtyInputRef = useRef()                          // ref for child <input> element
  const [qtyIsValid, setQtyIsValid] = useState(true)    // to display error msg below button

  const submitHandler = event => {
    event.preventDefault()
    const qty = +qtyInputRef.current.value
    if (qty < 0 || qty > 5 || isNaN(qty)) {
      setQtyIsValid(false)
      return
    }
    onAddToCart(qty)    // call method from parent component to add to context
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input 
        label='Quantity'
        attribs={{
          id: 'qty',
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1'
        }}
        ref={qtyInputRef}
      />
      <button type='submit'>+ Add</button>
      {!qtyIsValid && <p>Please enter a valid quantity: 1-5</p>}
    </form>
  )
}

export default MealItemForm
