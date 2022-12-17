import React from "react";
// next
import Link from "next/link";
// types
import { Country } from "../../types";

// propsType
type propsType = {
  country: Country;
};

const CountryCard = (props: propsType) => {
  const country = props.country;
  return (
    <Link key={country.name} href={`/countries/${country.name}`} passHref={true}>
      <div style={{ border: "1px solid red" }}>
        <h1>{country.name}</h1>
        <h2>{country.region}</h2>
      </div>
    </Link>
  );
};

export { CountryCard };
