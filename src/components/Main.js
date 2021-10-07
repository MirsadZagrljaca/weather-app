import React, { useState, useEffect } from "react";
import Header from "./Header";
import { TextField } from "@material-ui/core";
import axios from "axios";
import Weather from "./Weather";
require("dotenv").config();

const inputStyle = {
  marginTop: "5px",
  marginLeft: "15px",
  marginBottom: "10px",
};

const KEY = process.env.REACT_APP_API_KEY;

const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export default function Main() {
  const [data, setData] = useState([]);
  const [isFormOn, setIsFormOn] = useState(false);
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const URL = `https://api.openweathermap.org/data/2.5/find?q=${city}&units=metric&type=accurate&APPID=${KEY}`;

  const clickHandler = (e) => {
    setIsFormOn(!isFormOn);
  };

  const changeHandler = (e) => {
    setCity(e.target.value);
  };

  const sendRequest = (e) => {
    if (e.key === "Enter") {
      axios
        .get(URL, { HEADERS })
        .then((response) => {
          let temp = response.data.list[0].main.temp;
          let country = response.data.list[0].sys.country;
          let windSpeed = response.data.list[0].wind.speed;
          let icon = response.data.list[0].weather[0].icon;
          let tempWindDeg = response.data.list[0].wind.deg;

          let winDeg = "";

          if (tempWindDeg >= 0 && tempWindDeg < 45) {
            winDeg = "↑";
          } else if (tempWindDeg >= 45 && tempWindDeg < 90) {
            winDeg = "↗";
          } else if (tempWindDeg >= 90 && tempWindDeg < 135) {
            winDeg = "→";
          } else if (tempWindDeg >= 135 && tempWindDeg < 180) {
            winDeg = "↘";
          } else if (tempWindDeg >= 180 && tempWindDeg < 225) {
            winDeg = "↓";
          } else if (tempWindDeg >= 225 && tempWindDeg < 270) {
            winDeg = "↙";
          } else if (tempWindDeg >= 270 && tempWindDeg < 315) {
            winDeg = "←";
          } else if (tempWindDeg >= 315 && tempWindDeg < 360) {
            winDeg = "↖";
          } else if (tempWindDeg === 360) {
            winDeg = "↑";
          }

          let tempData = {
            city: city,
            country: country,
            temp: temp,
            icon: icon,
            windSpeed: windSpeed,
            windDeg: winDeg,
          };

          setData([...data, tempData]);
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage("That City Couldn't Be Found!");
        });

      setIsFormOn(false);
      setErrorMessage(" ");
    }
  };

  const removeHandler = (index) => {
    let newData = [];
    let j = 0;

    for (let i = 0; i < data.length; i++) {
      if (i !== index) {
        newData[j] = data[i];
        j++;
      }
    }

    setData(newData);
  };

  useEffect(() => {
    if (localStorage.getItem("data") === null) return;

    if (JSON.parse(localStorage.getItem("data")) === null) return;

    setData(JSON.parse(localStorage.getItem("data")));
  }, []);

  useEffect(() => {
    let newData = [];
    let j = 0;

    for (let i = 0; i < data.length; i++) {
      if (data[i] === null || data[i] === undefined) {
        console.log("Null/undefined");
      } else {
        newData[j] = data[i];
        j++;
      }
    }

    localStorage.setItem("data", JSON.stringify(newData));
  }, [data]);

  return (
    <div>
      {errorMessage === "" ? (
        <div></div>
      ) : (
        <div className="error-message">
          <p className="error-message-p">{errorMessage}</p>
        </div>
      )}
      <div className="container">
        <Header onClick={clickHandler} />
        {isFormOn ? (
          <div className="main-form">
            <TextField
              id="standard-basic"
              label="cities"
              variant="standard"
              style={inputStyle}
              onChange={changeHandler}
              onKeyDown={sendRequest}
            />
          </div>
        ) : (
          <div></div>
        )}
        {data.length === 0 ? (
          <div>
            <div className="main">
              <p className="main-p">Press + to add cities</p>
            </div>
          </div>
        ) : (
          <div>
            {data.map((value, index) => {
              return (
                <Weather
                  key={index}
                  value={value}
                  removeHandler={removeHandler}
                  index={index}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
