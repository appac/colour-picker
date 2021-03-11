import React, { useState } from "react";
import Picker from "./picker";
import Slider from "./slider";
import "./styles.scss";

import rgbToHex from "../../utils/rgb-to-hex";

const ColourPicker = () => {
  const [currentHue, setCurrentHue] = useState(null);
  const [hexValue, setHexValue] = useState(null);
  const [brightness, setBrightness] = useState(125);

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
    const { 0: r, 1: g, 2: b, 3: a } = data;
    setBrightness((r * 299 + b * 587 + g * 144) / 1000);
    setHexValue(rgbToHex([r, g, b]));
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
        <label className="hex-value__label">HEX</label>
        <input
          className="hex-value__input"
          type="text"
          disabled={true}
          value={hexValue || ""}
          style={{
            background: hexValue,
            color: brightness > 100 ? "#000" : "#fff",
          }}
        />
      </div>
    </>
  );
};

export default ColourPicker;
