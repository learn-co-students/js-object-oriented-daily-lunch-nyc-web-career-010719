// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0

class Neighborhood {
  constructor(name) {
    this.id = neighborhoodId++
    this.name = name
    store.neighborhoods.push(this)
  }
  deliveries() {
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id)
  }
  customers() {
    return store.customers.filter(delivery => delivery.neighborhoodId === this.id)
  }
  meals() {
    let deliveries = this.deliveries()
    console.log(deliveries)
    let onlyMeals = []
    let meals = deliveries.map(delivery => {
      onlyMeals.push(store.meals.find(meal => meal.id === delivery.mealId))
    })
    return [...new Set(onlyMeals)]
  }
}

class Delivery {
  constructor(mealId,neighborhoodId,customerId) {
    this.id = deliveryId++
    this.mealId = mealId
    this.customerId = customerId
    this.neighborhoodId = neighborhoodId
    store.deliveries.push(this)
  }
  meal() {
    return store.meals.find(meal => meal.id === this.mealId)
  }
  customer() {
    return store.customers.find(customer => customer.id === this.customerId)
  }
  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)
  }
}

class Customer {
  constructor(name,neighborhoodId) {
    this.id = customerId++
    this.name = name
    this.neighborhoodId = neighborhoodId
    store.customers.push(this)
  }
  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  }
  meals() {
    let deliveries = this.deliveries()
    return deliveries.map(delivery => store.meals.find(meal => delivery.mealId === meal.id))
  }
  totalSpent() {
    let meals = this.meals()
    let total = 0
    return meals.reduce(function(total,meals) {
      return total + meals.price
    },0)
  }
}

class Meal {
  constructor(title,price) {
    this.id = mealId++
    this.title = title
    this.price = price
    store.meals.push(this)
  }
  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }
  customers() {
    let deliveries = this.deliveries()
    return deliveries.map(delivery => store.customers.find(customer => delivery.customerId === customer.id))
  }
  static byPrice(){
    return (store.meals.sort((a,b) => b.price - a.price))
  }
}
