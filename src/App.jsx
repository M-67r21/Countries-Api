import { useReducer } from "react";
import reducer from "./Reducers/reducer";
import { usefetch } from "./Hooks/useFetch";
import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./Components/navBar";
import Countries from "./Components/countries";
import Country from "./Components/country";


const initialState = {
  inputField: undefined,
  search: undefined,
  filterWord: "All",
  data: [],
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { inputField, search, filterWord, data } = state;

  const { data: fetchData } = usefetch("https://restcountries.com/v3.1/all");

  const setInputField = (value) => {
    dispatch({ type: "SET_INPUT_FIELD", payload: value });
  };
  const setSearch = (value) => {
    dispatch({ type: "SET_SEARCH", payload: value });
  };
  const setFilter = (value) => {
    dispatch({ type: "SET_FILTER", payload: value });
  };
  const setData = (value) => {
    dispatch({ type: "SET_DATA", payload: value });
  };

  useEffect(() => {
    setData(fetchData);
  }, [fetchData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(inputField);
  };
  const handleSelect = (e) => {
    setFilter(e.target.value);
    setSearch(undefined);
    setInputField("");
  };

  const getCountryName = (code) => {
    let countryName;
    const country = datafilter((e) => {
      return e.alpha3ode === code;
    });
    countryName = country[0].name;
    return countryName;
  };

  const number =(number )=>{
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/">
            <div className="container">
              <form onSubmit={handleSubmit}>
                <div className="inputField">
                  <input
                    type="search"
                    placeholder="Search for a country..."
                    value={inputField}
                    onChange={(e) => {
                      setInputField(e.target.value);
                      setSearch(e.target.value);
                    }}
                  />
                  <i className="fas fa-search"></i>
                </div>
                <select id="region" name="region" onChange={handleSelect}>
                  <option value="All" defaultValue>
                    All
                  </option>
                  <option value="Africa">Africa</option>
                  <option value="Americas">America</option>
                  <option value="Asia">Asia</option>
                  <option value="Europe">Europe</option>
                  <option value="Oceania">Oceania</option>
                </select>
              </form>
            </div>
            <Countries
              filterWord={filterWord}
              input={search}
              number={number}
            />
          </Route>
          <Route
            path="/:countryName"
            children={
              <Country
                number={number}
                getCountryName={getCountryName}
              />
            }
          />
        </Switch>
      </div>
    </Router>
  );
  
}

export default App;
