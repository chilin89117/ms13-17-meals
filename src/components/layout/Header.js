import HeaderCartBtn from './HeaderCartBtn'
import mealsImg from '../../assets/img/meals.jpg'
import styles from './Header.module.css'

const Header = ({onShowCart}) => (    // props from App.js
  <>
    <header className={styles.header}>
      <h1>ReactMeals</h1>
      <HeaderCartBtn onShowCart={onShowCart}>Cart</HeaderCartBtn>
    </header>
    <div className={styles['main-image']}>
      <img src={mealsImg} alt='food' />
    </div>
  </>
)

export default Header
