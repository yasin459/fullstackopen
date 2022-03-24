import axios from "axios";
import { useEffect, useState } from "react";
import { api_key } from "./App";

export const SpeceficCountry = ({ data }) => {
  const [weather, setWeather] = useState({});
  const [icon, setIcon] = useState();
  useEffect(() => {
    if (data.name) {
      console.log("env: ", api_key);
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${data.capital[0]}&appid=${api_key}`;
      axios
        .get(url)
        .then((response) => {
          console.log("promise fulfilled");
          console.log("response in speceficCountry: ", response);
          setWeather(response.data);
          //   let iconUrl = `http://samples.openweathermap.org/data/2.5/weather?q=${data.capital[0]}&appid=${api_key}`;
          setIcon(
            `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png?appid=${api_key}`
          );
        })
        .catch((e) => console.warn("error: ", e));
    }
  }, [data]);
  console.warn("data: ", data);
  return data.name ? (
    <>
      <br />
      <br />
      <b>{data.name.common}</b>
      <br />
      <p>capital {data.capital[0]}</p>
      <p>area {data.area}</p>
      <br />
      <b>languages</b>
      <ul>
        {Object.values(data.languages).map((e) => (
          <li>{e}</li>
        ))}
      </ul>
      <br />
      <img src={data.flags.png} alt="png" />
      <br />

      {weather.wind ? (
        <>
          <p>Weather in {data.capital[0]}</p>
          <p>temprature: {weather.main.temp} Celcius</p>
          <img src={icon} alt="weather" />

          <p>wind: {weather.wind.speed} m/s</p>
        </>
      ) : (
        <p>fetching data for weather</p>
      )}
    </>
  ) : (
    <p>fetching data</p>
  );
};
