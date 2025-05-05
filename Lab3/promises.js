"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var readline = require("readline-sync");
var url = 'https://data.fixer.io/api';
var key = '3843a95c54b4d7e32ead20566e3058d8'; // Replace with your actual API key
var getInput = function (question) {
    return new Promise(function (resolve) {
        var input = readline.question(question);
        resolve(input);
    });
};
var checkValidCurrencyCode = function (code) {
    console.log('Checking Valid Currency Code...');
    return new Promise(function (resolve, reject) {
        axios_1.default.get("".concat(url, "/symbols"), {}).then(function (_a) {
            var data = _a.data, status = _a.status;
            console.log('API Response:', data); // Log the API response
            if (status === 200) {
                var currency = data.symbols;
                if (currency && currency.hasOwnProperty(code)) {
                    resolve(code);
                }
                else {
                    reject(new Error("Invalid currency code: ".concat(code)));
                }
            }
            else {
                reject('Connection Error');
            }
        }).catch(function (err) {
            console.error('Error fetching symbols:', err); // Log the error
            reject(err);
        });
    });
};
var getData = function (code) {
    console.log('Retrieving the rate...');
    return new Promise(function (resolve, reject) {
        // Include the API key in the URL as a query parameter
        axios_1.default.get("".concat(url, "/api/latest?base=EUR&symbols=").concat(code, "&access_key=").concat(key))
            .then(function (_a) {
            var data = _a.data, status = _a.status;
            if (status === 200) {
                resolve(data);
            }
            else {
                reject('Connection Error');
            }
        }).catch(function (err) {
            reject(err);
        });
    });
};
var getCurrencyFullName = function (code) {
    return new Promise(function (resolve, reject) {
        axios_1.default.get("".concat(url, "/symbols"), {}).then(function (_a) {
            var data = _a.data, status = _a.status;
            if (status === 200) {
                var currency = data.symbols;
                if (currency.hasOwnProperty(code)) {
                    resolve(currency[code]);
                }
                else {
                    reject(new Error("Currency code not found: ".concat(code)));
                }
            }
            else {
                reject('Connection Error');
            }
        }).catch(function (err) {
            reject(err);
        });
    });
};
var printConversion = function (data, amount, currencyName) {
    var rate = data.rates[Object.keys(data.rates)[0]];
    var convertedAmount = (amount * rate).toFixed(2);
    console.log("Converted Amount: ".concat(amount, " EUR = ").concat(convertedAmount, " ").concat(currencyName));
};
var exit = function () {
    return new Promise(function () {
        process.exit();
    });
};
getInput('Enter currency to convert to: ')
    .then(checkValidCurrencyCode)
    .then(function (code) {
    return getData(code).then(function (data) {
        return { data: data, code: code };
    });
})
    .then(function (_a) {
    var data = _a.data, code = _a.code;
    return getCurrencyFullName(code).then(function (currencyName) {
        return { data: data, currencyName: currencyName };
    });
})
    .then(function (_a) {
    var data = _a.data, currencyName = _a.currencyName;
    return getInput('Enter amount to convert: ').then(function (amount) {
        return { data: data, amount: parseFloat(amount), currencyName: currencyName };
    });
})
    .then(function (_a) {
    var data = _a.data, amount = _a.amount, currencyName = _a.currencyName;
    printConversion(data, amount, currencyName);
})
    .catch(function (err) { return console.error("Error: ".concat(err.message)); })
    .then(exit);
