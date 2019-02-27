
// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let nId = 0
class Neighborhood {
  constructor(name) {
    this.id = ++nId
    this.name = name
    store.neighborhoods.push(this)
  };
  deliveries() {
    return store.deliveries.filter(
        function(delivery) {
            return delivery.neighborhoodId === this.id;
        }.bind(this)
    );
  };
  customers() {
    return store.customers.filter(
        function(customer) {
            return customer.neighborhoodId === this.id;
        }.bind(this)
    );
  };
  meals() {
      const allMeals = this.customers().map(customer => customer.meals());
      const merged = [].concat.apply([], allMeals);
      return [...new Set(merged)];
    };




} // end of neighborhood class
let cId = 0
class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++cId
    store.customers.push(this)
  }
  deliveries() {
      return store.deliveries.filter(delivery => delivery.customerId === this.id);
    }
  meals() {
     return this.deliveries().map(delivery => delivery.meal());
  }
   totalSpent(){
     return this.meals().reduce((total, meal) => (total += meal.price), 0);
  }
} // end of customer class
let mId = 0
class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mId
    store.meals.push(this)
  }
  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id);
  }

  customers() {
    const allCustomers = this.deliveries().map(delivery => delivery.customer());
    return [...new Set(allCustomers)];
  }
  static byPrice(){
    return store.meals.sort(function(a,b){return a.price -b.price}).reverse()

  }
} //end of meal class
let dId = 0
class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++dId
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    store.deliveries.push(this)
  };

  meal() {
     return store.meals.find(meal => meal.id === this.mealId);
   };
  customer(){
    return store.customers.find(customer=>customer.id===this.customerId)
  };

  neighborhood(){
    return store.neighborhoods.find(neighborhood=>neighborhood.id===this.neighborhoodId)
  }





} //end of delivery class
