import React from "react";
import { Button } from "@material-ui/core";

const plusStyle = {
  color: "white",
  fontSize: "1.2rem",
};

const btnStyle = {
  backgroundColor: "#68cbf8",
  borderRadius: "10px",
  padding: "0.25rem",
  borderColor: "#68cbf8",
  marginTop: "-75px",
  marginLeft: "435px",
};

export default function Header({ onClick }) {
  return (
    <div className="header">
      <p className="header-p">Weather App</p>
      <Button variant="outlined" style={btnStyle} onClick={onClick}>
        <i className="fa fa-plus" aria-hidden="true" style={plusStyle}></i>
      </Button>
    </div>
  );
}
