import axios from "axios";
import { API_WEATHER } from "../constants/index.js";

const { baseUrl, city, country } = API_WEATHER;

export const getWeatherForecast = async (OPEN_WEATHER_API_KEY) => {
  const url = `${baseUrl}/data/2.5/forecast?q=${city},${country}&lang=us&units=metric&appid=${OPEN_WEATHER_API_KEY}`;
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
