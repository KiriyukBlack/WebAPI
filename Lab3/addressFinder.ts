import axios from 'axios';

const addressLocation = async (address: string) => {
  const url = `https://api.maptiler.com/geocoding/${address}.json?key=PJoJOMlCERRfRzQOmQaz`;
  try {
    const { data, status } = await axios.get(url, {});
    console.log(`${status}`);
    
    // Check if the API returned any features
    if (!data.features || data.features.length === 0) {
      throw new Error('No results found for the given address.');
    }

    console.log(data); // JSON Object
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
  if (process.argv.length < 3) {
    throw 'Missing parameter. Please provide an address.';
  }

  let address = process.argv[2];
  // Remove single quotes from the string
  address = address.replace(/'/g, '');
  
  addressLocation(address).then((data) => {
    // Extract longitude and latitude
    const { features } = data;
    const firstFeature = features[0];

    // Display longitude and latitude
    const lon = firstFeature.center[0];
    const lat = firstFeature.center[1];
    console.log(`lon: ${lon}, lat: ${lat}`);

    // Loop through features and print place names
    console.log('Place names found:');
    features.forEach((feature: any) => {
      console.log(feature.place_name);
    });
  });
} catch (err: any) {
  console.log(err);
}