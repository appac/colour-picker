import React, { useEffect, useRef } from "react";

const Slider = ({ handleHueChange }) => {
  const hueCanvas = useRef(null);

  useEffect(() => {
    drawHueSlider();
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

  const getHueValue = (pickLocation) => {
    const context = hueCanvas.current.getContext("2d");
    handleHueChange(context.getImageData(15, pickLocation, 1, 1));
  };

  // FIXME: See about setting an init value so the picker can render with a hue.
  // FIXME: Picker circle isn't being drawn. Layer/order issue with redraws?
  const drawPickerCircle = (pickLocation) => {
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
          const pickLocation = e.target.value;
          getHueValue(pickLocation);
          drawPickerCircle(pickLocation);
        }}
      />
    </div>
  );
};

export default Slider;
