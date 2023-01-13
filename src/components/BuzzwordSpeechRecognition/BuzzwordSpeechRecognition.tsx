import React, { useContext, useMemo } from "react";
import "./BuzzwordSpeechRecognition.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Button from "../Button/Button";
import { BingoContext } from "../../context/BingoContext";

export const BuzzwordSpeechRecognition: React.FC = () => {
  const { grid, setGridElement } = useContext(BingoContext);

  const commands = useMemo(() => {
    return grid
      ?.map((row, rowIndex) =>
        row.map((element, columnIndex) => ({
          command: `*${element.text}*`,
          isFuzzyMatch: true,
          fuzzyMatchingThreshold: 0.8,
          callback: () => {
            if (!element.selected) setGridElement?.(rowIndex, columnIndex);
          },
        }))
      )
      .flat();
  }, [grid, setGridElement]);

  const {
    // transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="speechRecContainer">
      <p style={{ paddingLeft: "10px" }}>
        Microphone: {listening ? "listening.." : "off"}
      </p>

      <div className="actionsCont">
        <Button
          onClick={() => {
            SpeechRecognition.startListening({ continuous: true });
          }}
          small
        >
          Start
        </Button>
        <Button
          onClick={() => {
            SpeechRecognition.stopListening();
          }}
          small
        >
          Stop
        </Button>
        <Button
          onClick={() => {
            resetTranscript();
          }}
          small
        >
          Reset
        </Button>
      </div>

      {/* <p  style={{ paddingLeft: "10px" }}>{transcript}</p> // To visualize the spoken words */}
    </div>
  );
};
