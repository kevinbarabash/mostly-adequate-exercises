export const curry = fn => (...args) => (args.length < fn.length) 
    ? curry(fn.bind(null, ...args)) : fn.apply(null, args);
export const compose = (...fns) => x => reduceRight((v, f) => f(v), x)(fns);
export const pipe = (...fns) => x => reduce((v, f) => f(v), x)(fns);
export const flip = (fn) => (...args) => fn(args.reverse());

// map :: (a -> a) -> [a] -> [a]
export const map = curry((fn, arr) => arr.map(fn));

// filter :: (a -> Bool) -> [a] -> [a]
export const filter = curry((fn, arr) => arr.filter(fn));

// reduce :: (b -> a -> b) -> b -> [a] -> b
export const reduce = curry((fn, x, arr) => arr.reduce(fn, x));

// reduceRight :: (b -> a -> b) -> b -> [a] -> b
export const reduceRight = curry((fn, x, arr) => arr.reduceRight(fn, x));


// id :: a -> a
export const id = (x) => x;

// trace :: a -> a
export const trace = curry((label, x) => (console.log(`${label}: %o`, x), x)); 


// prop :: String -> Object -> a
export const prop = curry((key, obj) => obj[key]);


// sum :: [Number] -> Number
export const sum = reduce((total, x) => total + x, 0);

// join :: [a] -> String
export const join = curry((str, arr) => arr.join(str));

// split :: String -> [String]
export const split = curry((splitOn, str) => str.split(splitOn));

// concat :: String -> String -> String
export const concat = curry((a, b) => a.concat(b));

export const match = curry((regexp, str) => str.match(regexp));
