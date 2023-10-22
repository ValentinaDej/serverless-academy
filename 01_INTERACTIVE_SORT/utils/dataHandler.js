import { extractNumbers, extracStrings } from "./dataProcessing.js";
import { ERROR_NO_DIGIT, ERROR_NO_WORD } from "../constsnts/messages.js";

export const sortStringsCaseSensitive = (data) => {
  data = extracStrings(data);

  if (data.length === 0) return ERROR_NO_WORD;
  return data.sort((a, b) => {
    const compareValue = a.toLowerCase().localeCompare(b.toLowerCase(), []);
    if (compareValue !== 0) return compareValue;
    if (a < b) return -1;
    if (a > b) return 1;

    return 0;
  });
};

export const sortNumbersAscending = (data) => {
  data = extractNumbers(data);

  if (data.length === 0) return ERROR_NO_DIGIT;
  return data.sort((a, b) => a - b);
};

export const sortNumbersDescending = (data) => {
  data = extractNumbers(data);

  if (data.length === 0) return ERROR_NO_DIGIT;
  return data.sort((a, b) => b - a);
};

export const sortStringLengthAscending = (data) => {
  data = extracStrings(data);

  if (data.length === 0) return ERROR_NO_WORD;
  return data.sort((a, b) => a.length - b.length);
};

export const getUniqueWords = (data) => {
  data = extracStrings(data);

  if (data.length === 0) return ERROR_NO_WORD;
  return Array.from(new Set(data)).join(" ");
};

export const getUniqueItems = (data) => {
  if (data.length === 0) return ERROR_NO_WORD;
  return Array.from(new Set(data)).join(" ");
};
