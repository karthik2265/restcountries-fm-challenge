import type { NextApiRequest, NextApiResponse } from 'next'
import CountryDetails from '../../models/CountryDetails'
import chalk from 'chalk'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const countryName = req.query.countryName
  const response = await fetch(`https://restcountries.com/v3.1/all`)
  const countries = await response.json()
  // map all cca2 names to common
  const cca2_to_common_name_map = new Map<string, string>()
  for (let country of countries) {
    cca2_to_common_name_map.set(country.cca2, country.name.common)
  }
  // get the country details of requested country
  const country = countries.find((country: any) => {
    return country.name.common.toLowerCase().includes(countryName)
  })
  const border_countries = country.borders.map((cca2_name: string) =>
    cca2_to_common_name_map.get(cca2_name)
  )
  const population = country.population
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  const currencies: string[] = []
  for (let key of Object.keys(country.currencies)) {
    currencies.push(country.currencies[key].name)
  }
  const languages: string[] = []
  for (let key of Object.keys(country.languages)) {
    languages.push(country.languages[key])
  }
  const flag = country.flags['png']
  res
    .status(200)
    .json(
      new CountryDetails(
        country.name.common,
        country.name.nativeName.eng,
        population,
        country.region,
        country.subregion,
        country.capital,
        country.tld,
        currencies,
        languages,
        border_countries,
        flag
      )
    )
}
