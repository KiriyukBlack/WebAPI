var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var _Person_first, _Person_last, _Employee_joinedDate, _Employee_grade;
var Person = /** @class */ (function () {
    function Person(firstname, lastname) {
        _Person_first.set(this, void 0); // # mean private
        _Person_last.set(this, void 0);
        if (firstname === undefined || lastname === undefined) {
            throw new Error('missing parameter');
        }
        __classPrivateFieldSet(this, _Person_first, firstname, "f");
        __classPrivateFieldSet(this, _Person_last, lastname, "f");
    }
    Person.prototype.name = function () {
        return "".concat(__classPrivateFieldGet(this, _Person_first, "f"), ", ").concat(__classPrivateFieldGet(this, _Person_last, "f"));
    };
    return Person;
}());
_Person_first = new WeakMap(), _Person_last = new WeakMap();
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee(firstname, lastname, grade) {
        if (grade === void 0) { grade = 1; }
        var _this = _super.call(this, firstname, lastname) || this;
        _Employee_joinedDate.set(_this, void 0);
        _Employee_grade.set(_this, void 0);
        __classPrivateFieldSet(_this, _Employee_joinedDate, new Date(), "f");
        __classPrivateFieldSet(_this, _Employee_grade, grade, "f");
        return _this;
    }
    Employee.prototype.calculateSalary = function (months) {
        if (months === void 0) { months = 1; }
        return __classPrivateFieldGet(this, _Employee_grade, "f") * 1000 * months;
    };
    return Employee;
}(Person));
_Employee_joinedDate = new WeakMap(), _Employee_grade = new WeakMap();
var e1 = new Employee('Luke', 'Skywalker', 20);
console.log("Employee ".concat(e1.name(), "'s 10 months salary is ").concat(e1.calculateSalary(10)));
