# CLI:TELEGRAM SENDER

**To run the bot:**

1. Clone the repository containing the bot's code.
2. Install the required dependencies by running: `npm install`.
3. Create a `.env` file in the project directory and define the necessary environment variables (e.g., `BOT_TOKEN` and `CHAT_ID`).
4. To run execute `env $(cat .env | xargs) node index.js <command>`
5. Get CHAT_ID by executing: `env $(cat .env | xargs) node index.js start`.

**Your Bot is Ready to Go!**

## List of Bot Features

The bot supports the following commands:

- `env $(cat .env | xargs)node index.js s | start`: Get the current chat ID.
- `env $(cat .env | xargs) node index.js m | message <message>`: Send a message on Telegram.
- `env $(cat .env | xargs) node index.js p | photo <path_to_photo>`: Send a photo on Telegram. You can add a photo by dragging the file or specifying a URL.
- `env $(cat .env | xargs) node index.js -h | --help`: Display help information.
- `env $(cat .env | xargs)node index.js -V | --version`: Display the bot's version.
