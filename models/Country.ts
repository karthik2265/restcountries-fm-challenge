class Country {
  name: string;
  population: string;
  region: string;
  capital: string[];
  id: Number
  constructor(
    name: string,
    population: string,
    region: string,
    capital: string[]
  ) {
    this.name = name;
    this.population = population;
    this.region = region;
    this.capital = capital;
    this.id = Math.random();
  }
}

export default Country;
