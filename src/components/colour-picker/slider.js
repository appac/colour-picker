import React, { useEffect, useRef, useState } from "react";

const Slider = ({ handleHueChange }) => {
  const hueCanvas = useRef(null);
  const [pickLocation, setPickLocation] = useState(100);

  useEffect(() => {
    drawHueSlider();
    drawPickerCircle();
    getHueValue();
  });

  const drawHueSlider = () => {
    const context = hueCanvas.current.getContext("2d");
    const gradientFill = context.createLinearGradient(0, 0, 0, 200);
    gradientFill.addColorStop(0, "rgb(255, 0, 0)");
    gradientFill.addColorStop(0.16, "rgb(255, 255, 0)");
    gradientFill.addColorStop(0.32, "rgb(0, 255, 0)");
    gradientFill.addColorStop(0.46, "rgb(0, 255, 255)");
    gradientFill.addColorStop(0.64, "rgb(0, 0, 255)");
    gradientFill.addColorStop(0.8, "rgb(255, 0, 255)");
    gradientFill.addColorStop(1.0, "rgb(255, 0, 0)");
    context.fillStyle = gradientFill;
    context.fillRect(0, 0, 30, 200);
  };

  const redrawHueSlider = () => {
    const context = hueCanvas.current.getContext("2d");
    context.clearRect(0, 0, 30, 200);
    drawHueSlider();
  };

  const getHueValue = () => {
    const context = hueCanvas.current.getContext("2d");
    handleHueChange(context.getImageData(15, pickLocation || 100, 1, 1));
  };

  const drawPickerCircle = () => {
    redrawHueSlider();
    const context = hueCanvas.current.getContext("2d");
    context.beginPath();
    context.arc(15, pickLocation, 5, 0, Math.PI * 2);
    context.stroke();
    context.closePath();
  };

  return (
    <div className="hue-slider">
      <canvas
        id="slider"
        className="hue-slider__canvas"
        ref={hueCanvas}
        width="30"
        height="200"
      />
      <input
        className="hue-slider__control"
        type="range"
        orient="vertical"
        min="1"
        max="199"
        step="1"
        defaultValue="100"
        onChange={(e) => {
          setPickLocation(e.target.value);
          getHueValue(pickLocation);
          drawPickerCircle(pickLocation);
        }}
      />
    </div>
  );
};

export default Slider;
