"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var addressLocation = function (address) { return __awaiter(void 0, void 0, void 0, function () {
    var url, _a, data, status_1, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                url = "https://api.maptiler.com/geocoding/".concat(address, ".json?key=PJoJOMlCERRfRzQOmQaz");
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1.default.get(url, {})];
            case 2:
                _a = _b.sent(), data = _a.data, status_1 = _a.status;
                console.log("".concat(status_1));
                // Check if the API returned any features
                if (!data.features || data.features.length === 0) {
                    throw new Error('No results found for the given address.');
                }
                console.log(data); // JSON Object
                return [2 /*return*/, data];
            case 3:
                err_1 = _b.sent();
                if (axios_1.default.isAxiosError(err_1)) {
                    return [2 /*return*/, err_1.message];
                }
                else {
                    return [2 /*return*/, err_1];
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
try {
    if (process.argv.length < 3) {
        throw 'Missing parameter. Please provide an address.';
    }
    var address = process.argv[2];
    // Remove single quotes from the string
    address = address.replace(/'/g, '');
    addressLocation(address).then(function (data) {
        // Extract longitude and latitude
        var features = data.features;
        var firstFeature = features[0];
        // Display longitude and latitude
        var lon = firstFeature.center[0];
        var lat = firstFeature.center[1];
        console.log("lon: ".concat(lon, ", lat: ").concat(lat));
        // Loop through features and print place names
        console.log('Place names found:');
        features.forEach(function (feature) {
            console.log(feature.place_name);
        });
    });
}
catch (err) {
    console.log(err);
}
