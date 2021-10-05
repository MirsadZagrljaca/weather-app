import React from "react";
import { Button } from "@material-ui/core";

const divStyle = {
  display: "inline-block",
  border: "1px solid black",
  width: "99.7%",
  height: "max-content",
};

export default function Weather({ value, removeHandler, index, arrow }) {
  return (
    <div className="city" key={index} style={divStyle}>
      <p className="city-top">
        {value.city}{" "}
        <img
          className="city-top-flag"
          src={`https://www.countryflags.io/${value.country}/shiny/64.png`}
          alt="flag"
        />
      </p>
      <div>
        <p className="city-bottom">
          {value.temp}°C{" "}
          <img
            src={`https://openweathermap.org/img/wn/${value.icon}.png`}
            alt="weather"
          />{" "}
          {value.windSpeed} km/h {value.windDeg}
        </p>
        <Button
          variant="text"
          style={{
            color: "#68cbf8",
            padding: "0px",
            marginLeft: "25px",
          }}
          onClick={() => removeHandler(index)}
        >
          REMOVE
        </Button>
      </div>
    </div>
  );
}
