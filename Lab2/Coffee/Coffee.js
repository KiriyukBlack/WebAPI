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
var _Coffee_roast, _Coffee_ounces;
Object.defineProperty(exports, "__esModule", { value: true });
var Coffee = /** @class */ (function () {
    function Coffee(roast, ounces) {
        if (ounces === void 0) { ounces = 8; }
        var _this = this;
        _Coffee_roast.set(this, void 0);
        _Coffee_ounces.set(this, void 0);
        //getSize = () => {
        //switch(this.#ounces) {
        //case 8:
        //return 'Small';
        //case 12:
        //return 'Medium';
        //case 16:
        //return 'Large';
        //default:
        //return 'undefined';
        //}
        //}
        this.getSize = function () {
            if (__classPrivateFieldGet(_this, _Coffee_ounces, "f") <= 8) {
                return 'Small';
            }
            else if (__classPrivateFieldGet(_this, _Coffee_ounces, "f") <= 12) {
                return 'Medium';
            }
            else {
                return 'Large';
            }
        };
        this.order = function () {
            var msg;
            msg = "You've ordered a ".concat(_this.getSize(), " ").concat(__classPrivateFieldGet(_this, _Coffee_roast, "f"), " coffee.");
            return msg;
        };
        if (roast === undefined) {
            throw Error('No roast defined');
        }
        __classPrivateFieldSet(this, _Coffee_roast, roast, "f");
        __classPrivateFieldSet(this, _Coffee_ounces, ounces, "f");
    }
    return Coffee;
}());
_Coffee_roast = new WeakMap(), _Coffee_ounces = new WeakMap();
exports.default = Coffee;
