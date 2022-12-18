import React from "react";
import { server } from "../../config/index";
// types
import { Countries } from "../../types";
import { CountryDetails } from "../../types";
import { RootState } from "../../store";
// next
import Head from "next/head";
import Image from "next/image";
import { NextPage } from "next";
import { useRouter } from "next/router";
// components
import { Header } from "../../components";
// redux
import { useSelector } from "react-redux";
// styles and icons
import styles from "./CountryDetails.module.css";
import BackIcon from "../../public/images/back-icon.svg";

const DetailsPage: NextPage<{ country: CountryDetails }> = ({ country }) => {
  // get theme
  const isLightTheme = useSelector((state: RootState) => state.ui.isLightTheme);
  // router
  const router = useRouter();

  // event handlers
  function routeChangeHandler(path: string) {
    router.push(path);
  }

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
        <div className={styles.btn + " " + styles["back-btn"]} onClick={() => routeChangeHandler("/")}>
          <Image src={BackIcon} alt="back icon" />
          <p>Back</p>
        </div>
        <div className={styles.info}>
          <div className={styles["img-container"]}>
            <Image src={country.flag} fill={true} objectFit="cover" alt="flag image" />
          </div>
          <div className={styles["info-container"]}>
            <div className={styles["info-header"]}>{country.name}</div>
            <div className={styles["info-body"]}>
              <div>
                <div className={styles["info-item"]}>
                  <p className={styles["info-key"]}>Native Name: </p>
                  <p className={styles["info-value"]}>{country.nativeName.join(", ")}</p>
                </div>
                <div className={styles["info-item"]}>
                  <p className={styles["info-key"]}>Population: </p>
                  <p className={styles["info-value"]}>{country.population}</p>
                </div>
                <div className={styles["info-item"]}>
                  <p className={styles["info-key"]}>Region: </p>
                  <p className={styles["info-value"]}>{country.region}</p>
                </div>
                <div className={styles["info-item"]}>
                  <p className={styles["info-key"]}>Sub Region </p>
                  <p className={styles["info-value"]}>{country.subRegion}</p>
                </div>
                <div className={styles["info-item"]}>
                  <p className={styles["info-key"]}>Capital: </p>
                  <p className={styles["info-value"]}>{country.capital.join(", ")}</p>
                </div>
              </div>
              <div>
                <div className={styles["info-item"]}>
                  <p className={styles["info-key"]}>Top Level Domain: </p>
                  <p className={styles["info-value"]}>{country.topLevelDomain.join(", ")}</p>
                </div>
                <div className={styles["info-item"]}>
                  <p className={styles["info-key"]}>Currencies: </p>
                  <p className={styles["info-value"]}>{country.currencies.join(", ")}</p>
                </div>
                <div className={styles["info-item"]}>
                  <p className={styles["info-key"]}>Languages </p>
                  <p className={styles["info-value"]}>{country.languages.join(", ")}</p>
                </div>
              </div>
            </div>
            <div className={styles["info-footer"]}>
              <div className={styles["info-item"] + " " + styles["border-countries-container"]}>
                <p className={styles["info-key"]}>Border Countries: </p>
                <div className={styles["border-countries"]}>
                  {country.borderCountries.map((x: string, i) => {
                    return (
                      <p
                        onClick={() => routeChangeHandler(`/countries/${x}`)}
                        key={i}
                        className={styles["info-value"] + " " + styles["btn"]}
                      >
                        {x}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// server side

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
  const country = await response.json();
  return {
    props: { country },
  };
}

export default DetailsPage;
