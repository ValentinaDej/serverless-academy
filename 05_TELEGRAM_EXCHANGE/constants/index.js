const CURRENCY_CODE = {
  UAH: 980,
  EUR: 978,
  USD: 840,
};

export const API_BANK = [
  {
    bankName: "MonoBank",
    baseUrl: "https://api.monobank.ua/bank/currency",
    answerKey: {
      currency: "currencyCodeA",
      mainCurrency: "currencyCodeB",
      buy: "rateBuy",
      sale: "rateSell",
      currencyMap: CURRENCY_CODE,
    },
  },
  {
    bankName: "PrivatBank",
    baseUrl: "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5",
    answerKey: {
      currency: "ccy",
      mainCurrency: "base_ccy",
      buy: "buy",
      sale: "sale",
    },
  },
];

export const API_WEATHER = {
  baseUrl: "https://api.openweathermap.org",
  forecastFreq: 3,
  city: "Rivne",
  country: "UA",
  weatherDescIcons: {
    "01": "☀️",
    "02": "🌤️",
    "03": "🌥️",
    "04": "☁️",
    "09": "🌧️",
    10: "🌦️",
    11: "⛈️",
    13: "❄️",
    50: "😶‍🌫️",
  },
};
