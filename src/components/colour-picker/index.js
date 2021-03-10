import React, { useState } from "react";
import Picker from "./picker";
import Slider from "./slider";

import rgbToHex from "../../utils/rgb-to-hex";

export default () => {
  const [currentHue, setCurrentHue] = useState(null);

  const hueChangeHandler = ({ data }) => {
    const { 0: red, 1: green, 2: blue, 3: alpha } = data;
    setCurrentHue({
      red,
      green,
      blue,
    });
    // Take ImageData and store it in the currentHue state. Passed to the slider.
  };

  const saturationChangeHandler = ({ data }) => {
    // Take ImageData and pass to utility function for conversion to HEX. Passed to the
    rgbToHex(currentHue);
  };

  return (
    <div>
      <Picker handleSaturationChange={saturationChangeHandler} />
      <Slider handleHueChange={hueChangeHandler} />
    </div>
  );
};
