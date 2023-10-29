import axios from "axios";
import { API_WEATHER } from "../constants/index.js";
import { fatchingError } from "../helpers/dateFotmater.js";

const { baseUrl, city, country } = API_WEATHER;
const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;

if (!OPEN_WEATHER_API_KEY) {
  console.log(
    "OPEN_WEATHER_API_KEY was not successfully loaded from the environment. \n Look at .env.example file and create yours. "
  );
  process.exit(1);
}

export const getWeatherForecast = async () => {
  const url = `${baseUrl}/data/2.5/forecast?q=${city},${country}&lang=us&units=metric&appid=${OPEN_WEATHER_API_KEY}`;
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    return fatchingError(error);
  }
};
