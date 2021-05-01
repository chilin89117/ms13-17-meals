import {useEffect, useState} from 'react'
import MealItem from './mealItem/MealItem'
import Card from '../ui/Card'
import styles from './AvailableMeals.module.css'

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  // component always starts in loading state in getting data from Firebase
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState(null)  

  useEffect(() => {
    // effect function can not be async, must be defined separately
    const fetchMeals = async () => {
      const response = await fetch(`${process.env.REACT_APP_FIRE}/ms1317meals.json`)
      if (!response.ok) throw new Error('Something went wrong!')
      const data = await response.json()
      const mealsFromFirebase = []
      // for Firebase-specific data structure
      for (const key in data) {
        mealsFromFirebase.push({id: key, ...data[key]})
      }
      setMeals(mealsFromFirebase)
      setIsLoading(false)
    }
    
    // can not use try-catch block to await fetchMeals() because useEffect would then need to be async
    fetchMeals().catch(err => {
      setIsLoading(false)
      setHttpError(err.message)
    })
  }, [])

  if (isLoading) return <section className={styles.loading}><h3>Loading...</h3></section>
  if (httpError) return <section className={styles.error}><h3>{httpError}</h3></section>
  
  return (
    <section className={styles.meals}>
      <Card>
        <ul>
          {meals.map(m => <MealItem key={m.id} meal={m} />)}
        </ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
