// react and redux
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countriesActions } from "../store/countries-slice";
// types
import type { GetStaticProps, NextPage } from "next";
import { Countries } from "../types";
import { RootState } from "../store";
// components
import { Filter } from "../components";
// config
import { server } from "../config/index";
// head
import Head from "next/head";
// next
import Link from "next/link";
import Image from "next/image";
// images
import MoonIcon from "../public/images/moon-icon.svg";
import SunIcon from "../public/images/day-sunny-icon.svg";
import { uiActions } from "../store/ui-slice";

const Home: NextPage<{ countries: Countries }> = ({ countries }) => {
  const dispatch = useDispatch();

  // put countries in redux-store
  useEffect(() => {
    dispatch(countriesActions.setCountries(countries));
  }, [dispatch, countries]);

  // set theme based on user preference
  useEffect(() => {
    if (window.matchMedia("prefers-color-scheme: dark")) {
      dispatch(uiActions.setLightTheme(false));
    } else {
      dispatch(uiActions.setLightTheme(true));
    }
  }, [dispatch]);

  // get theme
  const isLightTheme = useSelector((state: RootState) => state.ui.isLightTheme);

  // get filtered countries from redux store
  const filteredCountries = useSelector((state: RootState) => state.countries.filteredCountries);

  // components
  const DarkOrLightModeButton = () => {
    return (
      <div>
        {isLightTheme ? <Image src={MoonIcon} alt="moon icon" /> : <Image src={SunIcon} alt="sun icon" />}
        <h4> {(isLightTheme ? "Dark" : "Light") + " " + "Mode"} </h4>
      </div>
    );
  };

  const CountriesList = () => {
    return (
      <div>
        {filteredCountries.map((country) => {
          return (
            <Link key={country.name} href={`/countries/${country.name}`} passHref={true}>
              <div style={{ border: "1px solid red" }}>
                <h1>{country.name}</h1>
                <h2>{country.region}</h2>
              </div>
            </Link>
          );
        })}
      </div>
    );
  };

  // Home Page
  return (
    <div>
      <Head>
        <title>Where in the world?</title>
        <meta name="theme-color" content="hsl(0, 0%, 98%)" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="hsl(207, 26%, 17%)" media="(prefers-color-scheme: dark)" />
        <meta name="supported-color-schemes" content="light dark" />
      </Head>
      <header>
        <h1>Where in the world?</h1>
        <DarkOrLightModeButton />
      </header>
      <main>
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
