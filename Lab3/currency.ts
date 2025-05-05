import axios from 'axios';

const exchange = async (baseCurrency: string, symbol: string) => {
  const url = `https://data.fixer.io/api/latest?base=${baseCurrency}&symbols=${symbol}&access_key=3843a95c54b4d7e32ead20566e3058d8`;
  const options = {
    url: url,
  };
  
  try {
    const { data } = await axios.get(url, options);
    
    // Print the entire JSON response
    console.log(JSON.stringify(data, null, 2));
    
    const rate = data.rates[symbol];
    if (!rate) {
      throw new Error(`Unrecognized currency code: ${symbol}`);
    }
    
    const formattedRate = parseFloat(rate).toFixed(2);
    console.log(`1 ${baseCurrency} = ${formattedRate} ${symbol}`);
    return data;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return err.message;
    } else {
      return err;
    }
  }
}

try {
  if (process.argv.length < 4) {
    throw new Error('Missing parameters. Usage: currency [baseCurrency] [toSymbols]');
  } else {
    const baseCurrency = process.argv[2].toUpperCase();
    const symbol = process.argv[3].toUpperCase();
    exchange(baseCurrency, symbol);
  }
} catch (err: any) {
  console.log(`${err}`);
}