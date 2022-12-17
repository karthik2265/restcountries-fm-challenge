// react and redux
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countriesActions } from "../store/countries-slice";
// types
import type { GetStaticProps, NextPage } from "next";
import { Countries, Country } from "../types";
import { RootState } from "../store";
// components
import { CountryCard, Filter } from "../components";
// config
import { server } from "../config/index";
// head
import Head from "next/head";
// next
import Image from "next/image";
// images
import MoonIcon from "../public/images/moon-icon.svg";
import SunIcon from "../public/images/day-sunny-icon.svg";
import { uiActions } from "../store/ui-slice";
// styles
import styles from "./Home.module.css";

const Home: NextPage<{ countries: Countries }> = ({ countries }) => {
  const dispatch = useDispatch();

  // put countries in redux-store
  useEffect(() => {
    dispatch(countriesActions.setCountries(countries));
  }, [dispatch, countries]);

  // set theme based on user preference
  useEffect(() => {
    if (window.matchMedia("prefers-color-scheme: dark").matches) {
      dispatch(uiActions.setLightTheme(false));
    } else {
      dispatch(uiActions.setLightTheme(true));
    }
  }, [dispatch]);

  // get theme
  const isLightTheme = useSelector((state: RootState) => state.ui.isLightTheme);

  // get filtered countries from redux store
  const filteredCountries = useSelector((state: RootState) => state.countries.filteredCountries);

  // handler functions
  function changeThemeHandler() {
    dispatch(uiActions.setLightTheme(!isLightTheme));
  }

  // local components
  const DarkOrLightModeButton = () => {
    return (
      <div className={styles["theme-space"]} onClick={changeThemeHandler}>
        {isLightTheme ? (
          <Image className={styles["theme-icon"]} src={SunIcon} alt="sun icon" />
        ) : (
          <Image className={styles["theme-icon"]} src={MoonIcon} alt="moon icon" />
        )}
        <h4> {(isLightTheme ? "Light" : "Dark") + " " + "Mode"} </h4>
      </div>
    );
  };

  const CountriesList = () => {
    return (
      <div className={styles["countries-list"]}>
        {filteredCountries.map((country: Country, i) => {
          return <CountryCard key={i} country={country} />;
        })}
      </div>
    );
  };

  // Home Page
  return (
    <div data-theme={isLightTheme ? "light" : "dark"}>
      <Head>
        <title>Where in the world?</title>
        {/* themeing */}
        <meta name="theme-color" content="hsl(0, 0%, 98%)" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="hsl(207, 26%, 17%)" media="(prefers-color-scheme: dark)" />
        <meta name="supported-color-schemes" content="light dark" />
      </Head>
      <header className={styles.header}>
        <h1>Where in the world?</h1>
        <DarkOrLightModeButton />
      </header>
      <main className={styles.main}>
        <Filter />
        <CountriesList />
      </main>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch(`${server}/api/countries`);
  const data: Countries = await response.json();
  return {
    props: {
      countries: data,
    },
  };
};
