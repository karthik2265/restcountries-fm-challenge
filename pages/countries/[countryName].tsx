import { NextPage } from "next";
import React from "react";
import { server } from "../../config/index";
// types
import { Countries } from "../../types";
import { CountryDetails } from "../../types/countryDetails";
// head
import Head from "next/head";

const DetailsPage: NextPage<{ countryDetails: CountryDetails }> = ({
  countryDetails,
}) => {
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
      DetailsPage
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
