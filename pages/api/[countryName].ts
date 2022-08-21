import type { NextApiRequest, NextApiResponse } from "next";
import { CountryDetails } from "../../types/countryDetails";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { countryName } = req.query;
  const response = await fetch(
    `http://restcountries.com/v3.1/name/${countryName}`
  );
  const data = await response.json();
  const countryData = data[0];
  const countryDetails: CountryDetails = {
    flag: countryData.flags.svg,
    nativeName: getValuesOfObjectAsArray(countryData.name.nativeName).map(
      (d) => d.common
    ),
    population: countryData.population.toString(),
    region: countryData.region,
    subRegion: countryData.subregion,
    capital: countryData.capital,
    topLevelDomain: countryData.tld,
    currencies: getValuesOfObjectAsArray(countryData.currencies).map(
      (d) => d.name
    ),
    languages: getValuesOfObjectAsArray(countryData.languages),
    borderCountries: await getCommonNamesOfBorderCountriesFromCodeNames(
      countryData.borders
    ),
  };
  return res.send(countryDetails);
}

// utility func
function getValuesOfObjectAsArray(obj: any) {
  const arr = [];
  for (const key in obj) {
    const val = obj[key];
    arr.push(val);
  }
  return arr;
}

// get names of border countries
async function getCommonNamesOfBorderCountriesFromCodeNames(arr: any) {
  // use promise.all to fetch all
  let allRequests: Promise<any>[] = [];
  arr.forEach((code: String) => {
    allRequests.push(fetch(`https://restcountries.com/v3.1/alpha/${code}`));
  });
  const allResponses = await Promise.all(allRequests);
  allRequests = [];
  allResponses.forEach((response) => {
    allRequests.push(response.json());
  });
  let allData = await Promise.all(allRequests);
  allData = allData.map((arr) => arr[0]);
  const names = allData.map((country) => country.name.common);
  return names;
}
