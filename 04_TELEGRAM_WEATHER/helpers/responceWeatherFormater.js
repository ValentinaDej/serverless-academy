import { dateFormater, timeFormater } from "./dateFotmater.js";
import { API_WEATHER } from "../constants/index.js";

const { forecastFreq, weatherDescIcons } = API_WEATHER;

export const responceWeatherFormater = (weatherData, mode = forecastFreq) => {
  let formattedResponse = "";
  let currentDay = null;
  const step = mode / forecastFreq;

  for (let index = 0; index < 24; index += step) {
    const item = weatherData.list[index];

    const date = new Date(item.dt_txt);
    const dayIndex = date.getDate();
    if (dayIndex !== currentDay) {
      currentDay = dayIndex;
      formattedResponse += `\n<b>${dateFormater(date)}</b>\n`;
    }

    const temperature = Math.round(item.main.temp);
    const temperatureText =
      temperature.toString().length < 2 ? `  ${temperature}` : temperature;

    const iconCode = item.weather[0].icon.slice(0, 2);
    const weatherEmoji = weatherDescIcons[iconCode] || "🌥️";

    formattedResponse += `🌡  <b>${temperatureText}</b>°C  ${weatherEmoji}  ${timeFormater(
      date
    )}\n`;
  }

  return formattedResponse;
};
