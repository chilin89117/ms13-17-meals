import {createContext} from 'react'

// provider for context is in CartProvider.js
const CartContext = createContext({
  items: [],
  totalAmt: 0,
  addItem: item => {},
  removeItem: id => {},
  clearCart: () => {}
})

export default CartContext
