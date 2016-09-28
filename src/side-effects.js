import {curry, compose, prop, filter, eq, split, head, last, map, find} from './util'
import Maybe from './maybe'


// getFromStorage :: String -> (_ -> String)
const getFromStorage = (key) => () => localStorage[key]

class IO {
    constructor(f) {
        this.__value = f
    }

    static of(x) {
        // whatever this function returns is passed to the function
        // passed to map
        return new IO(() => x)
    }

    map(f) {
        return new IO(compose(f, this.__value))
    }
}

const io_window = IO.of(window)

const $ = (selector) => new IO(() => document.querySelectorAll(selector));

// it would be nice we could inform the type system that win is window
io_window.map((win) => win.innerWidth);

console.log(
    io_window.map(prop('location')).map(prop('href')).map(split('/')).__value()
)

console.log(
    $('#myDiv').map(head).map((div) => div.innerHTML).__value()
)


const url = new IO(() => window.location.href)
const toPairs = compose(map(split('=')), split('&'))
const params = compose(toPairs, last, split('?'))

const findParam = (key) => 
    // 'find' makes more sense in this situation than filter because we
    // want to return one of the params not an array containing on param.
    map(compose(Maybe.of, find(compose(eq(key), head)), params), url)

console.log(url.__value());
console.log(findParam("x").__value().toString());
console.log(findParam("y").__value().toString());
console.log(findParam("z").__value().toString());
