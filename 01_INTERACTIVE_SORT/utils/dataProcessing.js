export function isValidInput(inputArray) {
  return inputArray.length > 1 && inputArray.length <= 10;
}

export function splitIntoArray(line) {
  return line.replace(/\s\s+/g, " ").split(" ");
}

export const extractNumbers = (data) =>
  data.filter(Number).map((item) => Number(item));

export const extracStrings = (data) => data.filter((item) => isNaN(item));
