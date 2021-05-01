import {useContext, useEffect, useState} from 'react'
import CartContext from '../../store/cart-context'
import CartIcon from '../cart/CartIcon'
import styles from './HeaderCartBtn.module.css'

// button component to open cart modal from Header.js
const HeaderCartBtn = ({onShowCart}) => {    // props passed from App.js thru Header.js
  const [btnAnimated, setBtnAnimated] = useState(false)

  const cartCtx = useContext(CartContext)
  // add up the quantities of each item
  const numCartItems = cartCtx.items.reduce((count, item) => {
    return count + item.qty
  }, 0)

  const btnClasses = `${styles.button} ${btnAnimated ? styles.bump : ''}`

  useEffect(() => {
    // do nothing for empty cart
    if (cartCtx.items.length === 0) return
    // add .bump class to <button>
    setBtnAnimated(true)
    // remove .bump class after 300ms animation (see css)
    const timerId = setTimeout(() => {
      setBtnAnimated(false)
    }, 300)
    return () => clearTimeout(timerId)
  }, [cartCtx.items])

  return (
    <button className={btnClasses} onClick={() => onShowCart(true)}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numCartItems}</span>
    </button>
  )
}

export default HeaderCartBtn
