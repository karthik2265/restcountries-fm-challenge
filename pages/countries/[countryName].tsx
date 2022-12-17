import React from "react";
import { server } from "../../config/index";
// types
import { Countries } from "../../types";
import { CountryDetails } from "../../types";
import { RootState } from "../../store";
// next
import Head from "next/head";
import { NextPage } from "next";
// components
import { Header } from "../../components";
// redux
import { useSelector } from "react-redux";
// styles
import styles from "./CountryDetails.module.css";

const DetailsPage: NextPage<{ countryDetails: CountryDetails }> = ({ countryDetails }) => {
  // get theme
  const isLightTheme = useSelector((state: RootState) => state.ui.isLightTheme);
  return (
    <div data-theme={isLightTheme ? "light" : "dark"}>
      <Head>
        <title>Where in the world?</title>
        <meta name="theme-color" content="hsl(0, 0%, 98%)" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="hsl(207, 26%, 17%)" media="(prefers-color-scheme: dark)" />
        <meta name="supported-color-schemes" content="light dark" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles["img-container"]}></div>
        <div className={styles["info-container"]}></div>
      </main>
    </div>
  );
};

export async function getStaticPaths() {
  const response = await fetch(`${server}/api/countries`);
  const countries: Countries = await response.json();
  const paths = countries.map((country) => {
    return {
      params: { countryName: country.name },
    };
  });
  return {
    fallback: true,
    paths,
  };
}

export async function getStaticProps(context: any) {
  const countryName = context.params.countryName;
  const response = await fetch(`${server}/api/${countryName}`);
  const data = await response.json();
  return {
    props: { countryDetails: data },
  };
}

export default DetailsPage;
