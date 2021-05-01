import {useReducer} from 'react'
import CartContext from './cart-context'

const defaultCartState = {items: [], totalAmt: 0}

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    // new list of items in cart from current state
    let newCartItems = [...state.items]
    // action.payload is an item
    const updatedTotalAmt = state.totalAmt + action.payload.qty * action.payload.price
    const itemIndexInCart = newCartItems.findIndex(i => i.id === action.payload.id)
    const itemInCart = newCartItems[itemIndexInCart]
    if (itemInCart) newCartItems[itemIndexInCart].qty = itemInCart.qty + action.payload.qty
    else newCartItems.unshift(action.payload)
    return {items: newCartItems, totalAmt: updatedTotalAmt}
  }
  if (action.type === 'REMOVE') {
    // new list of items in cart from current state
    let newCartItems = [...state.items]
    // action.payload is an item id
    const itemIndexInCart = newCartItems.findIndex(i => i.id === action.payload)
    const itemInCart = newCartItems[itemIndexInCart]
    const updatedTotalAmt = state.totalAmt - itemInCart.price
    if (itemInCart.qty === 1) newCartItems.splice(itemIndexInCart, 1)
    else newCartItems[itemIndexInCart].qty -= 1
    return {items: newCartItems, totalAmt: updatedTotalAmt}
  }
  if (action.type === 'CLEAR') return {...defaultCartState}
  return {...defaultCartState}
}

// context provider used in App.js
const CartProvider = ({children}) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, {...defaultCartState})
  // items added from meals/mealitem/MealItemForm.js
  const addItemHandler = item => {
    cartDispatch({type: 'ADD', payload: item})
  }

  const removeItemHandler = id => {
    cartDispatch({type: 'REMOVE', payload: id})
  }

  const clearCartHandler = () => {
    cartDispatch({type: 'CLEAR'})
  }

  const cartCtx = {
    items: cartState.items,
    totalAmt: cartState.totalAmt,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler
  }

  return (
    <CartContext.Provider value={cartCtx}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
