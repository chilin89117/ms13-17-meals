import {createPortal} from 'react-dom'
import styles from './Modal.module.css'

const Backdrop = ({onShowCart}) => (<div className={styles.backdrop} onClick={() => onShowCart(false)}></div>)

const Overlay = ({children}) => (
  <div className={styles.modal}>
    <div className={styles.content}>{children}</div>
  </div>
)

// portal element in public/index.html
const portalElement = document.getElementById('overlays')

const Modal = ({onShowCart, children}) => {     // props from Cart.js
  return (
    <>
      {createPortal(<Backdrop onShowCart={onShowCart} />, portalElement)}
      {createPortal(<Overlay>{children}</Overlay>, portalElement)}
    </>
  )
}

export default Modal
