import TelegramBot from "node-telegram-bot-api";
import { Command } from "commander";

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
process.env["NTBA_FIX_350"] = 1;

if (!BOT_TOKEN || !CHAT_ID) {
  console.log(
    "BOT_TOKEN or CHAT_ID were not successfully loaded from the environment. \n Look at .env.example file and create your  "
  );
  process.exit(1);
}

const program = new Command();
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

program.name("sender").description("TELEGRAM SENDER").version("0.0.0.1");

program
  .command("start")
  .description("Get current chat ID")
  .alias("s")
  .action(async () => {
    bot.onText(/\/start/, async (data) => {
      const chatId = data.chat.id;
      console.log(chatId);
      await bot.sendMessage(chatId, String(chatId));
      process.exit();
    });
  });

program
  .command("message")
  .description("Send a message to Telegram")
  .argument("<message>", "message from bot")
  .alias("m")
  .action(async (data) => {
    await bot.sendMessage(CHAT_ID, data);
    process.exit();
  });

program
  .command("photo")
  .description("Send a photo to Telegram. Copy url or drag&drop")
  .argument("<path>", "photo from bot")
  .alias("p")
  .action(async (data) => {
    const options = {
      caption: "photo",
      contentType: "image/png",
    };

    await bot.sendPhoto(CHAT_ID, data, options);
    process.exit();
  });

program.on("command:*", (args) => {
  console.error(
    `Invalid command: ${args.join(
      " "
    )}\nSee --help for a list of available commands.`
  );
  process.exit(1);
});

program.parse();
