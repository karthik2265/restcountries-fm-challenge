class CountryDetails {
  name: string
  nativeName: string
  population: string
  region: string
  subRegion: string
  capital: string[]
  topLevelDomain: string
  currencies: string[]
  languages: string[]
  borderCountries: string[]
  flag: string

  constructor(
    name: string,
    nativeName: string,
    population: string,
    region: string,
    subRegion: string,
    capital: string[],
    topLevelDomain: string,
    currencies: string[],
    languages: string[],
    borderCountries: string[],
    flag: string
  ) {
    this.name = name
    this.nativeName = nativeName
    this.population = population
    this.region = region
    this.subRegion = subRegion
    this.capital = capital
    this.topLevelDomain = topLevelDomain
    this.currencies = currencies
    this.languages = languages
    this.borderCountries = borderCountries
    this.flag = flag
  }
}

export default CountryDetails
