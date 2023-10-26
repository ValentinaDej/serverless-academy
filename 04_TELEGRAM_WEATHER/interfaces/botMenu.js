import { FORECAST_FREQ, CITY } from "../constants/index.js";

export const mainMenu = {
  reply_markup: {
    inline_keyboard: [
      [{ text: `Forecast in ${CITY}`, callback_data: "click" }],
      [{ text: "Exit", callback_data: "exit" }],
    ],
    one_time_keyboard: true,
  },
};

export const intervalOptions = {
  reply_markup: {
    inline_keyboard: [
      [{ text: `Every ${FORECAST_FREQ} hours`, callback_data: FORECAST_FREQ }],
      [
        {
          text: `Every ${FORECAST_FREQ * 2} hours`,
          callback_data: FORECAST_FREQ * 2,
        },
      ],
      [{ text: "Back to main menu", callback_data: "back" }],
    ],
    one_time_keyboard: true,
  },
};
