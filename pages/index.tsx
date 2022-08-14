import type { GetStaticProps, NextPage } from "next";
import { useEffect } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { countriesActions } from "../store/countries-slice";
import { server } from "../config/index";
import { Filter } from "../components";
import { Countries } from "../types";

const Home: NextPage<{countries: Countries}> = ({ countries }) => {
  const dispatch = useDispatch();
  // effect to fetch data
  useEffect(() => {
    async function getCountries() {
      const response = await fetch(`${server}/api/countries`);
      console.log(
        "🚀 ~ file: index.tsx ~ line 18 ~ getCountries ~ response",
        response
      );
    }
    getCountries();
  }, []);
  return (
    <div>
      {countries.map((country) => {
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
   const data: Countries = await response.json()
   console.log(
     "🚀 ~ file: index.tsx ~ line 18 ~ getCountries ~ response",
     response
   );
  return {
    props: {
      countries: data
    }
  }
}
