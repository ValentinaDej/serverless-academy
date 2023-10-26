import { instance } from "./index.js";
import { CITY, COUNTRY } from "../constants/index.js";

export const getWeatherForecast = async (OPEN_WEATHER_API_KEY) => {
  const url = `data/2.5/forecast?q=${CITY},${COUNTRY}&lang=us&units=metric&appid=${OPEN_WEATHER_API_KEY}`;
  try {
    const request = await instance(url);
    const weather = request.data;
    return weather;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
