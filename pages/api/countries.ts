// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Country from '../../models/Country'

type Data = Country[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await fetch('https://restcountries.com/v2/all')
  const data = await response.json()
  const countries = data.map((country: any) => {
    return new Country(
      country.name.common,
      country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      country.region,
      country.capital
    )
  })
  res.status(200).json(countries)
}
