import {useContext, useState} from 'react'
import CartContext from '../../store/cart-context'
import Checkout from './Checkout'
import CartItem from './CartItem'
import Modal from '../ui/Modal'
import styles from './Cart.module.css'

const Cart = ({onShowCart}) => {      // props from App.js
  const [isCheckout, setIsCheckout] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)
  const cartCtx = useContext(CartContext)
  const totalAmtFormatted = `$${cartCtx.totalAmt.toFixed(2)}`
  const cartHasItems = cartCtx.items.length > 0
  
  // clear cart items and remove modal
  const clearCartHandler = () => {
    if (confirm('Clearing your cart. Are you sure?')) {
      cartCtx.clearCart()
      onShowCart(false)
    }
  }

  // add qty 1 when + button in CartItem is clicked
  const addItemHandler = item => cartCtx.addItem({...item, qty: 1})
  const removeItemHandler = id => cartCtx.removeItem(id)
  
  const cartItems = cartCtx.items.map(i => (
    <CartItem
      key={i.id}
      name={i.name}
      qty={i.qty}
      price={i.price}
      onAdd={addItemHandler.bind(null, i)}
      onRemove={removeItemHandler.bind(null, i.id)}
    />
  ))

  const orderBtnClickHandler = () => setIsCheckout(true)

  const submitOrderHandler = async userData => {
    setIsSubmitting(true)
    await fetch(`${process.env.REACT_APP_FIRE}/ms1317orders.json`, {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
        orderAmt: cartCtx.totalAmt
      }),
      headers: {'content-type': 'application/json'}
    })
    setIsSubmitting(false)
    setDidSubmit(true)
    cartCtx.clearCart()
  }

  // show Checkout form when Order button is clicked
  const modalActionBtns = (
    <div className={styles.actions}>
      <button className={styles['button--alt']} onClick={() => onShowCart(false)}>Cancel</button>
      {cartHasItems && <button className={styles.button} onClick={clearCartHandler}>Clear</button>}
      {cartHasItems && <button className={styles.button} onClick={orderBtnClickHandler}>Order</button>}
    </div>
  )

  const cartModalContent = (
    <>
      <ul className={styles['cart-items']}>{cartItems}</ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmtFormatted}</span>
      </div>
      {isCheckout
        ? <Checkout onCancel={() => onShowCart(false)} onSubmitOrder={submitOrderHandler} />
        : modalActionBtns
      }
    </>
  )

  const cartSubmittingContent = <p>Sending order data...</p>

  const cartDidSubmitContent = (
    <>
      <p>Order successfully placed!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={() => onShowCart(false)}>Close</button>
      </div>
    </>
  )
  
  return (
    <Modal onShowCart={onShowCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting &&   cartSubmittingContent}
      {didSubmit && !isSubmitting && cartDidSubmitContent}
    </Modal>
  )
}

export default Cart
