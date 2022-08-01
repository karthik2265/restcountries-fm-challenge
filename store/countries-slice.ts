import { createSlice } from '@reduxjs/toolkit'
import Country from '../models/Country'

const initialState: {
  allCountries: Country[]
  searchTerm: String
  filteredCountries: Country[]
} = {
  allCountries: [],
  searchTerm: '',
  filteredCountries: [],
}

const countriesSlice = createSlice({
  name: 'countries',
  initialState: initialState,
  reducers: {
    setCountries(state, action: { payload: Country[] }) {
      const countries = action.payload
      state.allCountries = countries
      state.filteredCountries = countries
    },
    filterCountries(state, action) {},
  },
})

const countriesActions = countriesSlice.actions
const countriesReducer = countriesSlice.reducer

export { countriesActions, countriesReducer }
export default countriesSlice
