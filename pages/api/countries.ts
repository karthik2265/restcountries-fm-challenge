// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json()
    console.log(data)
  } catch(e) {

  }
  
  
}
