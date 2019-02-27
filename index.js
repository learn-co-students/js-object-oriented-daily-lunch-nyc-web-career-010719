// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = ++neighborhoodId
    store.neighborhoods.push(this)
  }

  deliveries(){
    let myDeliveries = store.deliveries.filter(delivery => delivery.neighborhoodId === this.id)
    return myDeliveries
  }

  customers(){
    let myCustomers = store.customers.filter(customer => customer.neighborhoodId === this.id)
    return myCustomers
  }

  meals(){
    let deliveries = this.deliveries()
    let myDeliveries = deliveries.map(delivery => delivery.mealId)
    let meals = []
    myDeliveries.forEach(mealId => {
      meals.push(store.meals.find(meal => mealId === meal.id))
    })

    let newMeals = []
    meals.forEach(meal => {
      if(!newMeals.includes(meal)){
        newMeals.push(meal)
      }
    })
    return newMeals
  }

}

let customerId = 0
class Customer {
  constructor(name,neighborhoodId) {
    this.name = name
    this.id = ++customerId
    this.neighborhoodId = neighborhoodId
    store.customers.push(this)
  }

  deliveries(){
    let myDeliveries = store.deliveries.filter(delivery => delivery.customerId === this.id)
    return myDeliveries
  }

  meals(){
    let deliveries = this.deliveries()
    let myDeliveries = deliveries.map(delivery => delivery.mealId)
    let meals = []
    myDeliveries.forEach(mealId => {
      meals.push(store.meals.find(meal => mealId === meal.id))
    })
    return meals
  }

  totalSpent(){
    let total = 0
    this.meals().forEach(meal => {
      total += meal.price
    })
    return total
  }

}

let mealId = 0
class Meal {
  constructor(title,price){
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }

  deliveries(){
    let myDeliveries = store.deliveries.filter(delivery => delivery.mealId === this.id)
    return myDeliveries
  }

  customers(){
    let deliveries = this.deliveries()
    let myDeliveries = deliveries.map(delivery => delivery.customerId)
    let customers = []
    myDeliveries.forEach(customerId => {
      customers.push(store.customers.find(customer => customerId === customer.id))
    })
    return customers
  }

  static byPrice(){
    return store.meals.sort((a,b) => b.price - a.price)
  }

}

let deliveryId = 0
class Delivery {
  constructor(mealId,neighborhoodId,customerId){
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++deliveryId
    store.deliveries.push(this)
  }

  meal() {
    let myMeal = store.meals.find(meal => meal.id === this.mealId)
    return myMeal
  }

  customer() {
    let myCustomer = store.customers.find(customer => customer.id === this.customerId)
    return myCustomer
  }

  neighborhood() {
    let myNeighborhood = store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)
    return myNeighborhood
  }
}
