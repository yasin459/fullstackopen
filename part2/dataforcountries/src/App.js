import { useState } from "react";
import { CountryList } from "./CountryList";
import { Filter } from "./Filter";
import { SpeceficCountry } from "./SpeceficCountry";
import axios from "axios";
export const api_key = process.env.REACT_APP_API_KEY

const App = () => {
  const [speceficCountry, setSpeceficCountry] = useState({});
  const [list, setList] = useState([]);
  const [status, setStatus] = useState(0);
  const changeCountry = (data) => {
    setStatus(1);
    setSpeceficCountry(data);
  };
  const filter = async (text) => {
    console.log("text ", text);
    let name = text.target.value;
    let url = `https://restcountries.com/v3.1/name/${name}`;
    axios
      .get(url)
      .then((response) => {
        console.log("promise fulfilled");
        console.log("response: ", response);
        let data = response.data;
        if (data.length === 1) {
          changeCountry(data[0]);
        } else if (data.length <= 10) {
          setStatus(2);
          setList(data);
        } else {
          setStatus(3);
        }
      })
      .catch((e) => console.warn("error: ", e));
  };
  return (
    <div>
      <Filter onChange={filter} />
      {status === 0 ? null : status === 1 ? (
        <SpeceficCountry data={speceficCountry} />
      ) : status === 2 ? (
        <CountryList list={list} onClick={changeCountry} />
      ) : (
        <TooMany />
      )}
    </div>
  );
};
const TooMany = () => {
  return <p>Too many matches, specify another filter</p>;
};

export default App;
