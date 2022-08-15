import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { countryName } = req.query;
  const response = await fetch(`http://restcountries.com/v3.1/name/${countryName}`);
  const data = await response.json();
  return res.send(data);
}
