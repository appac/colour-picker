const rgbToHex = (rgbValues) => {
  const hexValues = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];
  const hexPairs = rgbValues.map((value) => {
    const firstOfPair = Math.floor(value / hexValues.length);
    const secondOfPair = value % hexValues.length;
    return `${hexValues[firstOfPair]}${hexValues[secondOfPair]}`;
  });
  return `#${hexPairs.join("")}`;
};

export default rgbToHex;
