import type { NextPage } from 'next'
import { useEffect } from 'react'
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux'
import { countriesActions } from '../store/countries-slice'
import { server } from '../config/index'

const Home: NextPage = () => {
  const dispatch = useDispatch()
  let countries = useSelector(
    (state: RootStateOrAny) => state.countries.filteredCountries
  )
  useEffect(() => {
    
  }, [])
  return (
    <div>
     hi
    </div>
  )
}

export default Home
