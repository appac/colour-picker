import React, { useState } from "react";
import Picker from "./picker";
import Slider from "./slider";
import "./styles.scss";

import rgbToHex from "../../utils/rgb-to-hex";

const ColourPicker = () => {
  const [currentHue, setCurrentHue] = useState(null);
  const [hexValue, setHexValue] = useState(null);

  const hueChangeHandler = ({ data }) => {
    const { 0: red, 1: green, 2: blue, 3: alpha } = data;
    setCurrentHue({
      red,
      green,
      blue,
      alpha,
    });
  };

  const saturationChangeHandler = ({ data }) => {
    // Take ImageData and pass to utility function for conversion to HEX. Passed to the
    rgbToHex(data);
  };

  return (
    <>
      <div className="colour-picker">
        <Picker
          currentHue={currentHue}
          handleSaturationChange={saturationChangeHandler}
        />
        <Slider handleHueChange={hueChangeHandler} />
      </div>
      <div className="hex-value">
        <input
          className="hex-value__input"
          type="text"
          disabled={true}
          value={hexValue}
        />
      </div>
    </>
  );
};

export default ColourPicker;
