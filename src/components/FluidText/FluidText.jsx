import { useEffect, useRef, useState } from "react";
import "./FluidText.css";

const isOverflowing = (el) => {
  return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
};

export const FluidText = ({ maxSize, minSize, children }) => {
  const fluidTextRef = useRef();
  const [fontSize, setFontSize] = useState(maxSize);

  // reset font-size when the text (children) changes - helps text 'grow' when text is reduced
  useEffect(() => {
    setFontSize(maxSize);
  }, [children, maxSize]);

  // decrease font-size if overflowing until minSize font size
  useEffect(() => {
    const decrementFontSize = () => setFontSize(fontSize - 1);

    if (fontSize > minSize && isOverflowing(fluidTextRef.current)) {
      decrementFontSize();
    }
  }, [children, fontSize, minSize]);

  return (
    <div className="fluidTextContainer" ref={fluidTextRef}>
      <div className="fluidTextItem" style={{ fontSize }}>
        {children}
      </div>
    </div>
  );
};

FluidText.defaultProps = {
  maxSize: "24",
  minSize: "10",
};
