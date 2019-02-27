// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = ++neighborhoodId
    store.neighborhoods.push(this)
  }

  deliveries() {
    let filtered = store.deliveries.filter(delivery => delivery.neighborhoodId === this.id)
    return filtered
  }

  customers() {
    let filtered = store.customers.filter(customer => customer.neighborhoodId === this.id)
    return filtered
  }

  meals() {
    let deliveries = this.deliveries()

    let mealIds = deliveries.map(delivery => delivery.mealId)

    let meals = []

    mealIds.forEach(mealId => {
      meals.push(store.meals.find(meal => mealId === meal.id))
    })

    let newMeals = []

    meals.forEach(meal => {
      if (!newMeals.includes(meal)) {
        newMeals.push(meal)
      }
    })

    return newMeals
  }

}

let customerId = 0
class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++customerId
    store.customers.push(this)
  }

  deliveries() {
    let filtered = store.deliveries.filter(delivery => delivery.customerId === this.id)
    return filtered
  }

  meals() {
    let deliveries = this.deliveries()

    let mealIds = deliveries.map(delivery => delivery.mealId)

    let meals = []

    mealIds.forEach(mealId => {
      meals.push(store.meals.find(meal => mealId === meal.id))
    })

    return meals
  }

  totalSpent() {
    let total = 0
    this.meals().forEach(meal => {
      total += meal.price
    })
    return total
  }
}

let mealId = 0
class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }

  deliveries() {
    let filtered = store.deliveries.filter(delivery => delivery.mealId === this.id)
    return filtered
  }

  customers() {
    let deliveries = this.deliveries()

    let customerIds = deliveries.map(delivery => delivery.customerId)

    let customerArray = []

    customerIds.forEach(customerId => {
      customerArray.push(store.customers.find(customer => customerId === customer.id))
    })

    return customerArray
  }

  static byPrice() {
    let sorted = store.meals.sort((a,b) => b.price - a.price)
    return sorted
  }
}

let deliveryId = 0
class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++deliveryId
    store.deliveries.push(this)
  }

  meal() {
    let filtered = store.meals.find(meal => meal.id === this.mealId)
    return filtered
  }

  customer() {
    let filtered = store.customers.find(customer => customer.id === this.customerId)
    return filtered
  }

  neighborhood() {
    let filtered = store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)
    return filtered
  }

}
