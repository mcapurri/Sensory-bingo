import React, { useContext } from "react";
import { BingoContext } from "../../context/BingoContext";
import Button from "../Button/Button";
import "./Modal.css";

const Modal: React.FC = () => {
  const { shuffleAndInitialize } = useContext(BingoContext);
  return (
    <>
      <div className={"darkLayout"} />
      <div className={"centered"}>
        <div className={"modal"}>
          <div className={"modalContent"}>
            <h1 className="h1" style={{ marginBottom: "0" }}>
              Congratulation,
            </h1>
            <p className="p" style={{ marginTop: "0" }}>
              we have a Winner!!
            </p>
          </div>
          <div className={"modalActions"}>
            <div className={"actionsContainer"}>
              <Button onClick={() => shuffleAndInitialize?.()}>New Game</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
