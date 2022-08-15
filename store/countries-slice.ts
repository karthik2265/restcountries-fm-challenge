import { createSlice } from "@reduxjs/toolkit";
import { Countries } from "../types/index";

// local types
interface IState {
  allCountries: Countries;
  searchTerm: string;
  selectedRegion: string;
  filteredCountries: Countries;
}

interface IUpdateAction {
  payload: string;
}

interface ISetAction {
  payload: Countries
} 

const initialState: IState = {
  allCountries: [],
  searchTerm: "",
  selectedRegion: "",
  filteredCountries: [],
};

// utility functions

// this function returns filtered countries based on searchTerm and selectedRegion
function filterCountries(
  countries: Countries,
  searchTerm: string,
  selectedRegion: string
): Countries {
  searchTerm = searchTerm.toLowerCase();
  selectedRegion = selectedRegion.toLowerCase();
  const filteredCountries = countries.filter((country) => {
    // get name and region of the country in lowe case
    const name = country.name.toLowerCase();
    const region = country.region.toLowerCase();
    // check if this country should be shown or filtered-out
    // in this case we don't need to filter
    if (searchTerm == "" && selectedRegion === "") return true;
    // in this case we only filter by region
    if (searchTerm == "") {
      return region.includes(selectedRegion);
    }
    // in this case we only filter by searchTerm
    if (selectedRegion === "filter by region") {
      return name.includes(searchTerm);
    }
    // in this case we filter by both
    return name.includes(searchTerm) && region.includes(selectedRegion);
  });
  return filteredCountries;
}

const countriesSlice = createSlice({
  name: "countries",
  initialState: initialState,
  reducers: {
    setCountries(state: IState, action: ISetAction) {
      state.allCountries = action.payload
      state.filteredCountries = action.payload
    },
    updateSearchTerm(state: IState, action: IUpdateAction) {
      const newSearchTerm = action.payload;
      state.searchTerm = newSearchTerm;
      const allCountries = state.allCountries;
      const region = state.selectedRegion;
      state.filteredCountries = filterCountries(
        allCountries,
        newSearchTerm,
        region
      );
    },
    updateSelectedRegion(state: IState, action: IUpdateAction) {
      const newSelectedRegion = action.payload;
      state.selectedRegion = newSelectedRegion;
      const allCountries = state.allCountries;
      const searchTerm = state.searchTerm;
      state.filteredCountries = filterCountries(
        allCountries,
        searchTerm,
        newSelectedRegion
      );
    },
  },
});

const countriesActions = countriesSlice.actions;
const countriesReducer = countriesSlice.reducer;

export { countriesActions, countriesReducer };
export default countriesSlice;
