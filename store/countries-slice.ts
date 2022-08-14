import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allCountries: [],
  searchTerm: '',
  selectedRegion: '',
  filteredCountries: [],
}

const countriesSlice = createSlice({
  name: 'countries',
  initialState: initialState,
  reducers: {
    filterCountries(state, action) {},
  },
})

const countriesActions = countriesSlice.actions
const countriesReducer = countriesSlice.reducer

export { countriesActions, countriesReducer }
export default countriesSlice
