import React, { useState } from "react";
import Picker from "./picker";
import Slider from "./slider";
import "./index.scss";

import rgbToHex from "../../utils/rgb-to-hex";

export default () => {
  const [currentHue, setCurrentHue] = useState(null);

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
    <div className="colour-picker">
      <Picker
        currentHue={currentHue}
        handleSaturationChange={saturationChangeHandler}
      />
      <Slider handleHueChange={hueChangeHandler} />
    </div>
  );
};
