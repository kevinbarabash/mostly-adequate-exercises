import {compose, curry, prop, match} from './util';

const concat = curry((a, b) => b.concat(a));

class Identity {
    constructor(x) {
        this.__value = x;
    }

    map(f) {
        return Identity.of(f(this.__value));
    }

    toString() {
        return `Container(${JSON.stringify(this.__value)})`;
    }

    static of(x) {
        return new Identity(x);
    }
}

const four = Identity.of(2).map((x) => x + 2);
console.log(`four = ${four}`);

const len = Identity.of('bombs').map(concat(' away')).map(prop('length'));
console.log(`len = ${len}`);

const len2 = Identity.of('bombs').map(compose(prop('length'), concat(' away')));
console.log(`len2 = ${len2}`);


class Maybe {
    constructor(x) {
        this.__value = x;
    } 
  
    isNothing() {
        return (this.__value === null || this.__value === undefined);
    }

    map(f) {
        return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
    };

    toString() {
        return `Maybe(${JSON.stringify(this.__value)})`;
    }

    static of(x) {
        return new Maybe(x);
    }
}

const as = Maybe.of('Malkovich Malkovich').map(match(/a/ig));
console.log(`${as}`);

const nothing = Maybe.of(null).map(match(/a/ig));
console.log(`${nothing}`);


const map = curry((f, any_functor_at_all) => any_functor_at_all.map(f));

const as2 = map(match(/a/ig))(Maybe.of('Malkovich Malkovich'));
console.log(`${as2}`);

const nothing2 = map(match(/a/ig))(Maybe.of(null));
console.log(`${nothing2}`);


const safeHead = (arr) => Maybe.of(arr[0]);

const streetName = compose(map(prop('street')), safeHead, prop('addresses'));

const nullStreet = streetName({
  addresses: [],
});
console.log(`nullStreet = ${nullStreet}`);

const shadyLane = streetName({
  addresses: [{
    street: 'Shady Ln.',
    number: 4201,
  }],
});
console.log(`shadyLane = ${shadyLane}`);