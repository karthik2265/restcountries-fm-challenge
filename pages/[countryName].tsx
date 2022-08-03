import { NextPage } from "next";
import React from "react";
import Country from "../models/Country";
import { server } from "../config/index";

const DetailsPage: NextPage = () => {
  return <div>DetailsPage</div>;
};

export async function getStaticPaths() {
  const response = await fetch(`${server}/api/countries`);
  const data = await response.json();
  console.log(data)
  const countryNames = data.map((country: Country) => country.name);
  return {
    fallback: false,
    paths: countryNames.map((countryName: string) => {
      return {
        params: {
          countryName,
        },
      };
    }),
  };
}

export async function getStaticProps(context: any) {
  const countryName = context.params.countryName;
  const response = await fetch(`${server}/api/${countryName}`);
  const data = await response.json();
  console.log(data);
  return {
    props: {},
  };
}

export default DetailsPage;
