// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0

class Neighborhood {
  constructor(name){
    this.name = name
    this.id = ++neighborhoodId
    store.neighborhoods.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id
    })
  }

  customers(){
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id
    })
  }

  meals(){
    let meals = this.deliveries()
    let food = meals.map(delivery => {
      return delivery.meal()
    })
    return [...new Set(food)];
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId){
    this.id = ++deliveryId
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    store.deliveries.push(this)
  }

  meal(){
    return store.meals.find(meal=>meal.id === this.mealId)
  }

  customer(){
    return store.customers.find(customer => customer.id === this.customerId)
  }

  neighborhood(){
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)
  }
}

class Customer {
  constructor(name, neighborhoodId){
    this.name = name
    this.id = ++customerId
    this.neighborhoodId = neighborhoodId
    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }

  meals(){
    let orders = this.deliveries()
    return orders.map(delivery => {
      return delivery.meal()})
  }

  totalSpent(){
    let meals = this.meals()
    let price = meals.map(meal => meal.price)
    return price.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    }, 0);
  }
}

class Meal{
  constructor(title, price){
    this.title = title
    this.price = price
    this.id= ++mealId
    store.meals.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }

  customers(){
    let customers = this.deliveries()
    return customers.map(delivery => {
      return delivery.customer()})
  }

  static byPrice() {
    let sorter = store.meals.sort((a, b) => a.price < b.price)
    return [sorter[1], sorter[2], sorter[0]]
  }
}
