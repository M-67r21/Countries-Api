import React from "react";
import useFetch  from "../Hooks/useFetch";
import { useState } from "react";
import { useEffect } from "react";

let url;

const Countries = ({ filterWord, input, number }) => {
  url = input
    ? `https://restcountries.com/v3.1/region/${input}`
    : "https://restcountries.com/v3.1/all";
  const { data, loading } = useFetch(url);
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    if (input) {
      setCountries(data);
    } else {
      if ((filterWord = "All")) {
        setCountries(data);
        console.log(data);
      } else {
        setCountries(
          data.filter((country) => {
            return country.region === filterWord;
          })
        );
      }
    }
  }, [input, data, filterWord]);
  return (
    <div className="countriesList">
      <div className="container">
        {loading && <h1 className="loading">Loading ...</h1>}
        {countries.length ? (
          countries.map((country) => {
            const { flag, name, population, region, capital } = country;
            return (
              <Link to={`/${name}`} className="listItem" key={name}>
                <img src={flag} alt={name} />
                <div className="info">
                  <h2>{name}</h2>
                  <div>
                    <h3>population:</h3>
                    <span>{number(population)}</span>
                  </div>
                  {region && (
                    <div>
                      <h3>region:</h3>
                      <span>{region}</span>
                    </div>
                  )}
                  {capital && (
                    <div>
                      <h3>capital:</h3>
                      <span>{capital}</span>
                    </div>
                  )}
                </div>
              </Link>
            );
          })
        ) : (
          <h1 className={loading ? "x" : "loading"} style={{ left: "35%" }}>
            There is no result for your search
          </h1>
        )}
      </div>
    </div>
  );
};

export default Countries;
