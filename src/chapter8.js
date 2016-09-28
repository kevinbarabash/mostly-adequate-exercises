import {compose, pipe, curry, prop, match, concat, id} from './util';
import Maybe from './maybe'

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



// withdraw :: Number -> Account -> Maybe
const withdraw = curry((amount, account) => 
    account.balance >= amount
        ? Maybe.of({balance: account.balance - amount})
        : Maybe.of(null))

const finishTransaction = (account) => `Your balance is $${account.balance.toFixed(2)}`;    

// getTwenty :: Account -> Maybe(String)
const getTwenty = compose(map(finishTransaction), withdraw(20));

const account1 = getTwenty({balance: 200.00})
const account2 = getTwenty({balance: 10.00})

console.log(`${getTwenty({balance: 200.00})}`);
console.log(`${getTwenty({balance: 10.00})}`);

const maybe = curry((x, f, m) => m.isNothing() ? x : f(m.__value));

const getTwenty2 = compose(maybe("You're broke!", finishTransaction), withdraw(20));

console.log(`${getTwenty2({balance: 200.00})}`);
console.log(`${getTwenty2({balance: 10.00})}`);


const Nothing = {
    isNothing: () => true,
    map: (f) => Nothing,
    toString: () => `Nothing`,
};

class Just {
    constructor(x) {
        this.__value = x
    }

    map(f) {
        return Just.of(f(this.__value))
    }

    toString() {
        return `Just(${JSON.stringify(this.__value)})`
    }

    static of(x) {
        return new Just(x)
    }
}

const withdraw2 = curry((amount, account) => 
    account.balance >= amount
        ? Just.of({balance: account.balance - amount})
        : Nothing)

const maybe2 = curry((x, f, m) => m === Nothing ? x : f(m.__value));

const getTwenty3 = compose(maybe2("You're broke!", finishTransaction), withdraw2(20));

console.log(`${getTwenty3({balance: 200.00})}`);
console.log(`${getTwenty3({balance: 10.00})}`);


class Left {
    constructor(x) {
        this.__value = x
    }

    static of(x) {
        return new Left(x)
    }

    map(f) {
        return this
    }

    toString() {
        return `Left(${JSON.stringify(this.__value)})`
    }
}

class Right {
    constructor(x) {
        this.__value = x
    }

    static of(x) {
        return new Right(x)
    }

    map(f) {
        return Right.of(f(this.__value))
    }

    toString() {
        return `Right(${JSON.stringify(this.__value)})`
    }
}

const r = Right.of('rain').map((str) => `b${str}`)
console.log(`${r}`);

const l = Left.of('rain').map((str) => `b${str}`);
console.log(`${l}`);

console.log(`${Right.of('rolls eyes...').map(prop('host'))}`)
console.log(`${Left.of('rolls eyes...').map(prop('host'))}`)


const moment = require('moment');


//  getAge :: Date -> User -> Either(String, Number)
const getAge = curry((now, user) => {
    const birthdate = moment(user.birthdate, 'YYYY-MM-DD');
    return birthdate.isValid()
        ? Right.of(now.diff(birthdate, 'years'))
        : Left.of('Birth date could not be parsed');
        // Left ignore all calls to map... so when we run into an error
        // we return a left and that error gets propagated all the way
        // out of the compose/pipe chain
});

const log = (...args) => {
    const [head, ...rest] = args;
    console.log(head.toString(), ...rest);
}

const age1 = getAge(moment(), {birthdate: '2005-12-12'});
log(age1);

const age2 = getAge(moment(), {birthdate: 'bananas'});
log(age2);

const add = curry((a, b) => a + b)
const fortune = compose(concat('If you survive, you will be '), add(1));
const zoltar = compose(map(log), map(fortune), getAge(moment()))

console.log('');
console.log('ZOLTAR');

zoltar({birthdate: '2005-12-12'})

// doesn't print anything, but returns Left('Birth date could not be parsed')
zoltar({birthdate: 'balloons!'})

// either :: (a -> c) -> (b -> c) -> Either a b -> c
// NOTE: to use this safely we should use a static type checker
// type Either = Left | Right 
const either = curry((f, g, e) => {
    switch (e.constructor) {
        case Left: return f(e.__value);
        case Right: return g(e.__value);
    }
});

const zoltar2 = compose(console.log, either(id, fortune), getAge(moment()));

console.log('ZOLTAR 2');
zoltar({birthdate: '2005-12-12'})
zoltar({birthdate: 'balloons!'})



