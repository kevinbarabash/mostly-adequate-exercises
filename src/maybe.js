export default class Maybe {
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
