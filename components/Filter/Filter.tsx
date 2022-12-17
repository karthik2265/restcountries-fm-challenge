import React, { useRef } from "react";
// redux
import { useDispatch } from "react-redux";
import { countriesActions } from "../../store/countries-slice";
// styles
import styles from "./Filter.module.css";
// images
import FindIcon from "../../public/images/find-icon.svg";
import Image from "next/image";

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
    <div className={styles.filter}>
      <div className={styles["filter-search"]}>
        <Image className={styles["find-icon"]} src={FindIcon} alt="find-icon" />
        <input
          className={styles.input}
          type="search"
          name="search"
          id="search"
          placeholder="Search for a country..."
          ref={inputRef}
          onChange={inputCHangeHandler}
        />
      </div>

      <div className={styles["filter-regions"]}>
        <select
          className={styles["filter-select-region"]}
          name="select"
          id="select"
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
