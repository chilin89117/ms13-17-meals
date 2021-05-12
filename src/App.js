import {useState} from 'react'
import Header from './components/layout/Header'
import Meals from './components/meals/Meals'
import Cart from './components/cart/Cart'
import CartProvider from './store/CartProvider'

const App = () => {
  const [cartIsShown, setCartIsShown] = useState(false)         // state of cart as modal

  const showCartHandler = isShown => setCartIsShown(isShown)    // argument is boolean

  return (
    <CartProvider>
      {cartIsShown && <Cart onShowCart={showCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  )
}

export default App
