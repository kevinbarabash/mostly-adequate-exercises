import {prop, reduce, map, filter, compose, curry} from './util';

// Example Data
const CARS = [{
  name: 'Ferrari FF',
  horsepower: 660,
  dollar_value: 700000,
  in_stock: true,
}, {
  name: 'Spyker C12 Zagato',
  horsepower: 650,
  dollar_value: 648000,
  in_stock: false,
}, {
  name: 'Jaguar XKR-S',
  horsepower: 550,
  dollar_value: 132000,
  in_stock: false,
}, {
  name: 'Audi R8',
  horsepower: 525,
  dollar_value: 114200,
  in_stock: false,
}, {
  name: 'Aston Martin One-77',
  horsepower: 750,
  dollar_value: 1850000,
  in_stock: true,
}, {
  name: 'Pagani Huayra',
  horsepower: 700,
  dollar_value: 1300000,
  in_stock: false,
}];

// helpers
const first = (arr) => arr[0];
const last = (arr) => arr[arr.length - 1];


// Exercise 1:
// ============
// Use _.compose() to rewrite the function below. Hint: _.prop() is curried.
const isLastInStock = compose(prop('in_stock'), last);
const lastInStock = isLastInStock(CARS);
console.log(`lastInStock = ${lastInStock}`);

// Exercise 2:
// ============
// Use _.compose(), _.prop() and _.head() to retrieve the name of the first car.
const nameOfFirstCar = compose(prop('name'), first)(CARS);
console.log(`nameOfFirstCar = ${nameOfFirstCar}`);


// Exercise 3:
// ============
// Use the helper function average to refactor averageDollarValue as a composition.

// NOTE: not all functions are curried.  reduce takes a non curried function as it's first param'
const add = (a, b) => a + b;
const average = (arr) => reduce(add, 0)(arr) / arr.length;

const averageDollarValue = compose(average, map(prop('dollar_value')));
const avgCarValue = averageDollarValue(CARS);
console.log(`avgCarValue = ${avgCarValue}`);

// Exercise 4:
// ============
// Write a function: sanitizeNames() using compose that returns a list of lowercase and underscored 
// car's names: 
// e.g: sanitizeNames([{name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true}]) 
// => ['ferrari_ff'].

const replace = curry((pattern, repl, str) => str.replace(pattern, repl));
const lowercase = (str) => str.toLowerCase();
const uppercase = (str) => str.toUpperCase();
const underscore = replace(/\W+/g, '_');
// const _underscore = _.replace(/\W+/g, '_'); //<-- leave this alone and use to sanitize

const sanitizeNames = map(compose(underscore, lowercase, prop('name')));
const sanitizedNames = sanitizeNames(CARS);
console.log(`santizedNames = ${sanitizedNames}`);
// const sanitizeNames = undefined;


// Bonus 1:
// ============
// Refactor availablePrices with compose.

// const availablePrices = function(cars) {
//   const available_cars = _.filter(_.prop('in_stock'), cars);
//   return available_cars.map(function(x) {
//     return accounting.formatMoney(x.dollar_value);
//   }).join(', ');
// };

const join = curry((joinStr, arr) => arr.join(joinStr));
const availablePrices = 
    compose(join(', '), map((car) => `$${car.dollar_value}`), filter(prop('in_stock')))
console.log(`availablePrices = ${availablePrices(CARS)}`);

// Bonus 2:
// ============
// Refactor to pointfree. Hint: you can use _.flip().

const sort = curry((fn, arr) => [...arr].sort(fn));
const sortBy = curry((fn, arr) => sort((a, b) => fn(a) - fn(b))(arr));

const fastestCar = compose(last, sortBy(prop('horsepower')));
const fastest = fastestCar(CARS);
console.log(`${fastest.name} is the fastest car`);

// const fastestCar = function(cars) {
//   const sorted = _.sortBy(function(car) {
//     return car.horsepower;
//   }, cars);
//   const fastest = _.last(sorted);
//   return fastest.name + ' is the fastest';
// };
