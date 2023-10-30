import TelegramBot from "node-telegram-bot-api";
import { getWeatherForecast } from "./api/getWeatherForecast.js";
import { responceWeatherFormater } from "./helpers/responceWeatherFormater.js";
import { intervalOptions, mainMenu } from "./interfaces/botMenu.js";
import { API_WEATHER, USER_ERROR_MSG } from "./constants/index.js";

const { forecastFreq } = API_WEATHER;
const BOT_TOKEN = process.env.BOT_TOKEN;

process.env["NTBA_FIX_350"] = 1;

if (!BOT_TOKEN) {
  console.log(
    "BOT_TOKEN was not successfully loaded from the environment. \n Look at .env.example file and create your  "
  );
  process.exit(1);
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.on("callback_query", async (btn) => {
  const chatId = btn.message?.chat.id;

  if (!chatId) return;

  if (btn.data === "forecast") {
    await bot.sendMessage(chatId, "Select the interval:", intervalOptions);
  }

  if (btn.data === "back") {
    bot.sendMessage(chatId, "Choose the city to recive forecast:", mainMenu);
  }

  if (btn.data === "exit") {
    bot.sendMessage(chatId, "Bye! See you!");
    return;
  }

  if (
    Number(btn.data) === forecastFreq ||
    Number(btn.data) === forecastFreq * 2
  ) {
    const data = await getWeatherForecast();
    if (data) {
      const formatedData = responceWeatherFormater(data, Number(btn.data));
      bot.sendMessage(chatId, formatedData, {
        parse_mode: "HTML",
      });
    } else {
      await bot.sendMessage(chatId, USER_ERROR_MSG);
    }
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
