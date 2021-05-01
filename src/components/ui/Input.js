import {forwardRef} from 'react'
import styles from './Input.module.css'

// allow custom Input to be referenced using forwardRef()
const Input = forwardRef(({label, attribs}, ref) => (
  <div className={styles.input}>
    <label htmlFor={attribs.id}>{label}</label>
    <input {...attribs} ref={ref} />
  </div>
))

export default Input
