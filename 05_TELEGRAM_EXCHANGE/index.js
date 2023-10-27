import TelegramBot from "node-telegram-bot-api";
import { getWeatherForecast } from "./api/getWeatherForecast.js";
import { getEnvVariables } from "./helpers/getEnvVariables.js";
import { responceFormatter } from "./helpers/responceFormatter.js";
import { intervalOptions, mainMenu } from "./interfaces/botMenu.js";
import { FORECAST_FREQ } from "./constants/index.js";

const BOT_TOKEN = process.env.BOT_TOKEN;

process.env["NTBA_FIX_350"] = 1;

if (!BOT_TOKEN || !OPEN_WEATHER_API_KEY) {
  console.log(
    "BOT_TOKEN or CHAT_ID were not successfully loaded from the environment. \n Look at .env.example file and create your  "
  );
  process.exit(1);
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.on("callback_query", async (btn) => {
  const chatId = btn.message?.chat.id;

  if (!chatId) return;

  if (btn.data === "click") {
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
    Number(btn.data) === FORECAST_FREQ ||
    Number(btn.data) === FORECAST_FREQ * 2
  ) {
    const data = await getWeatherForecast(OPEN_WEATHER_API_KEY);
    bot.sendMessage(chatId, responceFormatter(data, Number(btn.data)), {
      parse_mode: "HTML",
      reply_markup: {
        remove_keyboard: true,
      },
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
