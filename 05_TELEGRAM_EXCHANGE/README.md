# CLI:TELEGRAM WEATHER FORECAST / EXCHANGE RATE

**To run the bot:**

1. Clone the repository containing the bot's code.
2. Install the required dependencies by running: `npm install`.
3. Create a `.env` file in the project directory and define the necessary environment variables (e.g., `BOT_TOKEN` and `OPEN_WEATHER_API_KEY`).
4. Get OPEN_WEATHER_API_KEY key at [OpenWeatherMap](https://openweathermap.org).
5. Start bot by running: `env $(cat .env | xargs) node index.js`.

**Your Bot is Ready to Go!**

The bot supports the following features:

1. Send to bot `/start` command.
2. Choose **"Forecast in Rivne"** or **"Exchange rate"** from the menu.
3. In the **"Forecast"** case select either a 3-hour or 6-hour interval for weather updates.
4. In the **"Exchange"** case select currency for rate updates.
5. If you wish to return to the main menu press **"Back to main menu"** button.
