class Country {
  name: string
  population: string
  region: string
  capital: string[]
  id = Math.random()
  constructor(
    name: string,
    population: string,
    region: string,
    capital: string[]
  ) {
    this.name = name
    this.population = population
    this.region = region
    this.capital = capital
  }
}

export default Country
