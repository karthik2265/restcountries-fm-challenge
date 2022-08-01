import type { NextPage } from 'next'
import { useEffect } from 'react'
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux'
import Country from '../models/Country'
import { countriesActions } from '../store/countries-slice'
import { server } from '../config/index'

const Home: NextPage = () => {
  const dispatch = useDispatch()
  let countries = useSelector(
    (state: RootStateOrAny) => state.countries.filteredCountries
  )
  useEffect(() => {
    async function data() {
      const res = await fetch(`${server}/api/countries`)
      const data = await res.json()
      const countries = data.map((country: Country) => {
        return {
          name: country.name,
          population: country.population,
          region: country.region,
          capital: country.capital,
          id: Math.random(),
        }
      })
      dispatch(countriesActions.setCountries(countries))
    }
    data()
  }, [dispatch])
  return (
    <div>
      {countries.map((country: Country) => {
        return <h1 key={country.id}>{country.population}</h1>
      })}
    </div>
  )
}

export default Home
