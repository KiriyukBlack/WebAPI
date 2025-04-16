"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Person2_first, _Person2_last, _Employee2_joinedDate, _Employee2_grade;
class Person2 {
    constructor(firstname, lastname) {
        _Person2_first.set(this, void 0);
        _Person2_last.set(this, void 0);
        this.name = () => {
            return `${__classPrivateFieldGet(this, _Person2_first, "f")}, ${__classPrivateFieldGet(this, _Person2_last, "f")}`;
        };
        if (firstname === undefined || lastname === undefined) {
            throw new Error('missing parameter');
        }
        __classPrivateFieldSet(this, _Person2_first, firstname, "f");
        __classPrivateFieldSet(this, _Person2_last, lastname, "f");
    }
}
_Person2_first = new WeakMap(), _Person2_last = new WeakMap();
class Employee2 extends Person2 {
    constructor(firstname, lastname, grade = 1) {
        super(firstname, lastname);
        _Employee2_joinedDate.set(this, void 0);
        _Employee2_grade.set(this, void 0);
        this.calculateSalary = (months = 1) => {
            return __classPrivateFieldGet(this, _Employee2_grade, "f") * 1000 * months;
        };
        __classPrivateFieldSet(this, _Employee2_joinedDate, new Date(), "f");
        __classPrivateFieldSet(this, _Employee2_grade, grade, "f");
    }
}
_Employee2_joinedDate = new WeakMap(), _Employee2_grade = new WeakMap();
const e2 = new Employee2('Luke', 'Skywalker', 20);
console.log(`Employee ${e2.name()}'s 10 months salary is ${e2.calculateSalary(10)}`);
