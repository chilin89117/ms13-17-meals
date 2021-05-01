import {useContext} from 'react'
import CartContext from '../../../store/cart-context'
import MealItemForm from './MealItemForm'
import styles from './MealItem.module.css'

const MealItem = ({meal}) => {          // props from AvailableMeals.js
  const {id, name, descr, price} = meal
  const priceFormatted = `$${price.toFixed(2)}`

  const cartCtx = useContext(CartContext)

  const addToCart = qty => {
    cartCtx.addItem({id, name, qty, price})
  }

  return (
    <li className={styles.meal}>
      <div>
        <h3>{name}</h3>
        <div className={styles.descr}>{descr}</div>
        <div className={styles.price}>{priceFormatted}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCart} />
      </div>
    </li>
  )
}

export default MealItem
