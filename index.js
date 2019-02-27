// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let nId = 0
class Neighborhood {
  constructor(name) {
    this.id = ++nId
    this.name = name
    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
          return delivery.neighborhoodId === this.id
      }.bind(this)
    )
  }

  customers() {
    return store.customers.filter(
      function(customer) {
          return customer.neighborhoodId === this.id
      }.bind(this)
    )
  }

  meals() {
    const allMeals = this.customers().map(customer => customer.meals());
    var unique = allMeals[0].filter(function(item, i, ar){ return ar.indexOf(item) === i; });
    return unique
  }

}

let cId = 0
class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++cId
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
          return delivery.customerId === this.id
      }.bind(this)
    )
  }

  meals() {
    return this.deliveries().map(delivery => delivery.meal());
  }

  totalSpent() {
    let total = 0
    for (var i = 0; i < this.meals().length; i++) {
      total += this.meals()[i].price
    }
    return total
  }

}

let mId = 0
class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mId
    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
          return delivery.mealId === this.id
      }.bind(this)
    )
  }

  customers() {
    const allCustomers = this.deliveries().map(delivery => delivery.customer());
    return [...new Set(allCustomers)];
  }

  static byPrice() {
    return store.meals.sort(function(a, b){return a.price - b.price}).reverse()
  }

}

let dId = 0
class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++dId
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(meal => meal.id === this.mealId);
  }

  customer() {
    return store.customers.find(customer => customer.id === this.customerId);
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
  }

}
