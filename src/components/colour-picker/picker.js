import React, { useCallback, useEffect, useRef, useState } from "react";

const SaturationPicker = ({ currentHue, handleSaturationChange }) => {
  const saturationCanvas = useRef(null);

  useEffect(() => {
    const canvas = saturationCanvas.current;
    // Draw picker...
    drawSaturationPicker();
    // ...attach click event listener
    canvas.addEventListener("click", handlePickerClick, false);
    // ...detach event listener on re-render (stops multiple listeners being attached and fired all at once on click)
    return () => {
      canvas.removeEventListener("click", handlePickerClick, false);
    };
  });

  function handlePickerClick(event) {
    const context = saturationCanvas.current.getContext("2d");
    const rect = saturationCanvas.current.getBoundingClientRect();
    redrawSaturationPicker();
    handleSaturationChange(
      context.getImageData(
        event.pageX - rect.left,
        event.pageY - rect.top,
        1,
        1
      )
    );
    context.lineWidth = 2;
    context.strokeStyle = "#ffffff";
    context.shadowColor = "rgba(0,0,0,0.25)";
    context.shadowOffsetX = 1;
    context.shadowOffsetY = 1;
    context.shadowBlur = 3;
    context.beginPath();
    context.arc(
      event.pageX - rect.left,
      event.pageY - rect.top,
      5,
      0,
      Math.PI * 2
    );
    context.stroke();
    context.closePath();
  }

  const drawSaturationPicker = useCallback(() => {
    const context = saturationCanvas.current.getContext("2d");
    const gradient = context.createLinearGradient(0, 0, 0, 200);
    context.fillStyle = gradient;
    context.fillRect(0, 0, 30, 200);
    if (currentHue) {
      const { red, green, blue, alpha } = currentHue;
      gradient.addColorStop(0, "rgba(255,255,255,255)");
      gradient.addColorStop(0.5, `rgba(${red}, ${green}, ${blue}, ${alpha})`);
      gradient.addColorStop(1, "rgba(0,0,0,255");
      context.fillStyle = "gradient";
    } else {
      context.fillStyle = "grey";
    }
    context.fillRect(0, 0, 200, 200);
  }, [currentHue]);

  const redrawSaturationPicker = () => {
    const context = saturationCanvas.current.getContext("2d");
    context.clearRect(0, 0, 30, 200);
    drawSaturationPicker();
  };

  return (
    <div className="saturation-picker">
      <canvas
        id="picker"
        className="saturation-picker__canvas"
        ref={saturationCanvas}
        height="200"
        width="200"
      />
    </div>
  );
};

export default SaturationPicker;
