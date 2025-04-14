function largestNumber(a, b) {
    if (a > b)
        return a;
    if (b > a)
        return b;
    return null;
}
var biggest = largestNumber(5, 8);
console.log(biggest);
var nums = [5, 8];
console.log(largestNumber.apply(void 0, nums));
function add() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    var total = 0;
    console.log(values);
    for (var i = 0; i < values.length; i++) {
        total += values[i];
    }
    return total;
}
console.log(add(2, 3, 4, 5, 6, 7));
// example with default parameter
function divide(dividend, divisor) {
    if (divisor === void 0) { divisor = 1; }
    var quotient = dividend / divisor;
    return quotient;
}
var quotient = divide(42, 2);
console.log("calling the divide function with '2' paramters: ".concat(quotient));
var quotient2 = divide(42);
console.log("calling divide function with '1' parameter: ".concat(quotient2));
// function expression using arrow syntax (preferred)
var remainder2 = function (dividend, divisor) {
    var quotient = Math.floor(dividend / divisor);
    return dividend - quotient;
};
console.log(remainder2(13, 4));
// function expression using arrow syntax and one parameter
var sqr = function (num) { return num * num; };
console.log(sqr(4));
