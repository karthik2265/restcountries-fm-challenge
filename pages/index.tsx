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

const Home: NextPage<{ countries: Countries }> = ({ countries }) => {
  const dispatch = useDispatch();

  // put countries in redux-store
  useEffect(() => {
    dispatch(countriesActions.setCountries(countries));
  }, [dispatch, countries]);

  const filteredCountries = useSelector(
    (state: RootState) => state.countries.filteredCountries
  );

  return (
    <div>
      <Head>
        <title>Where in the world?</title>
        <meta
          name="theme-color"
          content="hsl(0, 0%, 98%)"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="hsl(207, 26%, 17%)"
          media="(prefers-color-scheme: dark)"
        />
        <meta name="supported-color-schemes" content="light dark" />
      </Head>
      <Filter />
      {filteredCountries.map((country) => {
        return (
          <div style={{ border: "1px solid red" }} key={country.name}>
            <h1>{country.name}</h1>
            <h2>{country.region}</h2>
          </div>
        );
      })}
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
