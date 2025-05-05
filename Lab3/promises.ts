import axios from 'axios';
import * as readline from 'readline-sync';

const url = 'https://data.fixer.io/api';
const key = '3843a95c54b4d7e32ead20566e3058d8'; // Replace with your actual API key

const getInput = (question: string): Promise<string> => {
  return new Promise<string>((resolve) => {
    const input = readline.question(question);
    resolve(input);
  });
};

const checkValidCurrencyCode = (code: string): Promise<string> => {
  console.log('Checking Valid Currency Code...');
  return new Promise<string>((resolve, reject) => {
    axios.get(`${url}/symbols`, {}).then(({ data, status }) => {
      console.log('API Response:', data); // Log the API response
      if (status === 200) {
        const currency = data.symbols;
        if (currency && currency.hasOwnProperty(code)) {
          resolve(code);
        } else {
          reject(new Error(`Invalid currency code: ${code}`));
        }
      } else {
        reject('Connection Error');
      }
    }).catch((err) => {
      console.error('Error fetching symbols:', err); // Log the error
      reject(err);
    });
  });
};

const getData = (code: string): Promise<any> => {
  console.log('Retrieving the rate...');
  return new Promise((resolve, reject) => {
    // Include the API key in the URL as a query parameter
    axios.get(`${url}/api/latest?base=EUR&symbols=${code}&access_key=${key}`)
      .then(({ data, status }) => {
        if (status === 200) {
          resolve(data);
        } else {
          reject('Connection Error');
        }
      }).catch((err) => {
        reject(err);
      });
  });
};

const getCurrencyFullName = (code: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    axios.get(`${url}/symbols`, {}).then(({ data, status }) => {
      if (status === 200) {
        const currency = data.symbols;
        if (currency.hasOwnProperty(code)) {
          resolve(currency[code]);
        } else {
          reject(new Error(`Currency code not found: ${code}`));
        }
      } else {
        reject('Connection Error');
      }
    }).catch((err) => {
      reject(err);
    });
  });
};

const printConversion = (data: any, amount: number, currencyName: string): void => {
  const rate = data.rates[Object.keys(data.rates)[0]];
  const convertedAmount = (amount * rate).toFixed(2);
  console.log(`Converted Amount: ${amount} EUR = ${convertedAmount} ${currencyName}`);
};

const exit = (): Promise<void> => {
  return new Promise(() => {
    process.exit();
  });
};

getInput('Enter currency to convert to: ')
  .then(checkValidCurrencyCode)
  .then((code) => {
    return getData(code).then(data => {
      return { data, code };
    });
  })
  .then(({ data, code }) => {
    return getCurrencyFullName(code).then(currencyName => {
      return { data, currencyName };
    });
  })
  .then(({ data, currencyName }) => {
    return getInput('Enter amount to convert: ').then(amount => {
      return { data, amount: parseFloat(amount), currencyName };
    });
  })
  .then(({ data, amount, currencyName }) => {
    printConversion(data, amount, currencyName);
  })
  .catch(err => console.error(`Error: ${err.message}`))
  .then(exit);