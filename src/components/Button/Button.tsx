import React from "react";
import { FluidText } from "../FluidText/FluidText";
import "./Button.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void | undefined;
  small?: boolean;
}
const Button: React.FC<ButtonProps> = ({ children, onClick, small }) => {
  return (
    <>
      <button className={small ? "button small" : "button"} onClick={onClick}>
        <FluidText>{children}</FluidText>
      </button>
    </>
  );
};

export default Button;
