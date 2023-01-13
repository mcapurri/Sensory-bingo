import React from "react";
import { GridElement } from "../../context/BingoContext";
import logo from "../../assets/sensory-logo.png";
import "./Box.css";
import { FluidText } from "../FluidText/FluidText";

interface BoxProps {
  onBoxClicked: () => void;
  gridElement: GridElement;
}

export const Box: React.FC<BoxProps> = ({ onBoxClicked, gridElement }) => {
  return (
    <div
      onClick={onBoxClicked}
      className="boxContainer"
      style={{
        backgroundColor: gridElement.selected ? "#d770d9" : "lightyellow",
        color: gridElement.selected ? "lightyellow" : "#90188c",
      }}
    >
      <FluidText>{gridElement.text}</FluidText>
    </div>
  );
};

export const JollyBox = () => {
  return (
    <div className={"boxContainer jollyBoxContainer"}>
      <div>
        <img src={logo} alt="logo" className="image" />
      </div>
    </div>
  );
};
