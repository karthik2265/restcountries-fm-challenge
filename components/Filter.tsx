import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { countriesActions } from "../store/countries-slice";

const Filter = () => {
  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  // handlers
  function inputCHangeHandler() {
    if (inputRef.current !== null) {
      const newSearchTerm = inputRef.current.value;
      dispatch(countriesActions.updateSearchTerm(newSearchTerm));
    }
  }

  function selectCHangeHandler() {
    if (selectRef.current !== null) {
      const newSelectedRegion: string = selectRef.current.value;
      dispatch(countriesActions.updateSelectedRegion(newSelectedRegion));
    }
  }

  return (
    <div className="filter">
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search for a country"
        ref={inputRef}
        onChange={inputCHangeHandler}
      />

      <div className="filter__regions">
        <select
          name="select"
          id="select"
          className="select"
          ref={selectRef}
          onChange={selectCHangeHandler}
        >
          <option value="">Filter by region</option>
          <option value="Africa">Africa</option>
          <option value="America">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </div>
  );
};

export { Filter };
