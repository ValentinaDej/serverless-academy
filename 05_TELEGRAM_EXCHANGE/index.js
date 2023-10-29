import TelegramBot from "node-telegram-bot-api";
import NodeCache from "node-cache";

import { getWeatherForecast } from "./api/getWeatherForecast.js";
import { getAllExchangeRates } from "./api/getExchangeRate.js";
import { responceWeatherFormater } from "./helpers/responceWeatherFormater.js";
import { responseExchangeFormatter } from "./helpers/responceExcangeFormater.js";
import {
  intervalOptions,
  exchangeOptions,
  mainMenu,
} from "./interfaces/botMenu.js";
import { API_WEATHER } from "./constants/index.js";

const { forecastFreq } = API_WEATHER;

const BOT_TOKEN = process.env.BOT_TOKEN;
const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;

process.env["NTBA_FIX_350"] = 1;

if (!BOT_TOKEN || !OPEN_WEATHER_API_KEY) {
  console.log(
    "BOT_TOKEN or CHAT_ID were not successfully loaded from the environment. \n Look at .env.example file and create your  "
  );
  process.exit(1);
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });
const cache = new NodeCache();

bot.on("callback_query", async (btn) => {
  const chatId = btn.message?.chat.id;

  if (!chatId) return;

  if (btn.data === "forecast") {
    await bot.sendMessage(chatId, "Select the interval:", intervalOptions);
  }

  if (btn.data === "exchange") {
    await bot.sendMessage(chatId, "Select the currency:", exchangeOptions);
  }

  if (btn.data === "back") {
    bot.sendMessage(chatId, "Choose the city to recive forecast:", mainMenu);
  }

  if (btn.data === "exit") {
    bot.sendMessage(chatId, "Bye! See you!");
    return;
  }

  if (btn.data === "USD" || btn.data === "EUR") {
    const data = await getAllExchangeRates(btn.data);
    await bot.sendMessage(chatId, responseExchangeFormatter(data), {
      parse_mode: "HTML",
    });
  }

  if (
    Number(btn.data) === forecastFreq ||
    Number(btn.data) === forecastFreq * 2
  ) {
    const data = await getWeatherForecast(OPEN_WEATHER_API_KEY);
    bot.sendMessage(chatId, responceWeatherFormater(data, Number(btn.data)), {
      parse_mode: "HTML",
    });
  }
});

bot.onText(/\/\w+/, function (msg) {
  if (msg.text === "/start") {
    bot.sendMessage(
      msg.chat.id,
      "Choose the city to recive forecast:",
      mainMenu
    );
  } else {
    bot.sendMessage(msg.chat.id, "Sorry, I don't understand that command.");
  }
});