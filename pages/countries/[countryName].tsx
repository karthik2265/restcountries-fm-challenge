import { NextPage } from "next";
import React from "react";
import { server } from "../../config/index";

const DetailsPage: NextPage = () => {
  return <div>DetailsPage</div>;
};

export async function getStaticPaths() {
  // const response = await fetch(`${server}/api/countries`);
  // const data = await response.json();
  return {
    fallback: false,
    paths: [],
  };
}

export async function getStaticProps(context: any) {
  const countryName = context.params.countryName;
  // const response = await fetch(`${server}/api/${countryName}`);
  // const data = await response.json();
  return {
    props: {},
  };
}

export default DetailsPage;
