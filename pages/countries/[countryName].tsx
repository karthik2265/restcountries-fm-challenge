import { NextPage } from "next";
import React from "react";
import { server } from "../../config/index";
import { Countries } from "../../types";

const DetailsPage: NextPage<{ countryDetails: any }> = ({ countryDetails }) => {
  return <div>DetailsPage</div>;
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
