// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Countries } from '../../types';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.table({name: 'karthik'})
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json()
    const countries: Countries = data.map((c: any) => ({name: c.name.common, region: c.region, population: c.population, capital: c.capital}))
    return res.status(200).json(countries)
  } catch(e) {

  }
  
  
}
