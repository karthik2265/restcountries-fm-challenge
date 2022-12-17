import React from "react";
// next
import { NextRouter, useRouter } from "next/router";
import Image from "next/image";
// types
import { Country } from "../../types";
// styles
import styles from "./CountryCard.module.css";

// propsType
type propsType = {
  country: Country;
};

// event handlers
function redirect(path: string, router: NextRouter) {
  router.push(path);
}

const CountryCard = (props: propsType) => {
  const router = useRouter();
  const country = props.country;
  return (
    <div
      onClick={() => {
        redirect(`/countries/${country.name}`, router);
      }}
      className={styles.card}
    >
      <div className={styles["img-container"]}>
        <Image src={country.flag} fill={true} objectFit="cover" alt="flag image" />
      </div>
      <div className={styles["card-body"]}>
        <h2 className={styles["card-body-title"]}>{country.name}</h2>
        <div>
          <div className={styles["info"]}>
            <p className={styles["info-key"]}>Population: </p>
            <p className={styles["info-value"]}>{country.population}</p>
          </div>
          <div className={styles["info"]}>
            <p className={styles["info-key"]}>Region: </p>
            <p className={styles["info-value"]}>{country.region}</p>
          </div>
          <div className={styles["info"]}>
            <p className={styles["info-key"]}>Capital: </p>
            <p className={styles["info-value"]}>{country.capital}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CountryCard };
