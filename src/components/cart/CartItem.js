import styles from './CartItem.module.css'

const CartItem = ({name, qty, price, onAdd, onRemove}) => {
  const priceFormatted = `$${price.toFixed(2)}`

  return (
    <li className={styles['cart-item']}>
      <div>
        <h3>{name}</h3>
        <div className={styles.summary}>
          <span className={styles.price}>{priceFormatted}</span>
          <span className={styles.qty}>x {qty}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={onRemove}>−</button>
        <button onClick={onAdd}>+</button>
      </div>
    </li>
  )
}

export default CartItem
