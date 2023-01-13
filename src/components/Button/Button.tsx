import React from "react"; //  { useContext }
import "./Button.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void | undefined;
}
const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <>
      <button className="button" onClick={onClick}>
        {children}
      </button>
    </>
  );
};

export default Button;
