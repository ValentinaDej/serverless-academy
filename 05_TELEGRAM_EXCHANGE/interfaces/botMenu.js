import { API_WEATHER } from "../constants/index.js";

const { forecastFreq, city } = API_WEATHER;

export const mainMenu = {
  reply_markup: {
    inline_keyboard: [
      [{ text: `Forecast in ${city}`, callback_data: "forecast" }],
      [{ text: `Exchange rate`, callback_data: "exchange" }],
      [{ text: "Exit", callback_data: "exit" }],
    ],
    one_time_keyboard: true,
  },
};

export const intervalOptions = {
  reply_markup: {
    inline_keyboard: [
      [{ text: `Every ${forecastFreq} hours`, callback_data: forecastFreq }],
      [
        {
          text: `Every ${forecastFreq * 2} hours`,
          callback_data: forecastFreq * 2,
        },
      ],
      [{ text: "Back to main menu", callback_data: "back" }],
    ],
    one_time_keyboard: true,
  },
};

export const exchangeOptions = {
  reply_markup: {
    inline_keyboard: [
      [{ text: `USD`, callback_data: "USD" }],
      [
        {
          text: `EUR`,
          callback_data: "EUR",
        },
      ],
      [{ text: "Back to main menu", callback_data: "back" }],
    ],
    one_time_keyboard: true,
  },
};
