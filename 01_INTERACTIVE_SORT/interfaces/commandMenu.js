import {
  sortStringsCaseSensitive,
  sortNumbersAscending,
  sortNumbersDescending,
  sortStringLengthAscending,
  getUniqueWords,
  getUniqueItems,
} from "../utils/dataHandler.js";

export const commandMenu = [
  {
    id: 1,
    title: "Sort words alphabetically",
    action: sortStringsCaseSensitive,
  },
  {
    id: 2,
    title: "Show numbers from lesser to greater",
    action: sortNumbersAscending,
  },
  {
    id: 3,
    title: "Show numbers from bigger to smaller",
    action: sortNumbersDescending,
  },
  {
    id: 4,
    title: "Display words in ascending order by number of letters in the word",
    action: sortStringLengthAscending,
  },
  { id: 5, title: "Show only unique words", action: getUniqueWords },
  {
    id: 6,
    title: "Display only unique values from the set of words and numbers",
    action: getUniqueItems,
  },
];
