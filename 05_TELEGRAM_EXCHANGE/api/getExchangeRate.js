import axios from "axios";
import NodeCache from "node-cache";

import { API_BANK } from "../constants/index.js";
import { errorHandler } from "../helpers/errorHandler.js";

const cache = new NodeCache();

export const getAllExchangeRates = async (currency) => {
  const exchangeRates = [];

  for (const bank of API_BANK) {
    const exchangeRate = await getExchangeRate(bank, currency);
    if (exchangeRate) {
      exchangeRates.push(exchangeRate);
    } else {
      return errorHandler(`Error: fetching data for API ${bank.bankName}.`);
    }
  }

  return exchangeRates;
};

const getExchangeRate = async (bank, currency) => {
  let exchangeRate = null;

  let mainCurrency = "UAH";
  if (bank.answerKey.currencyMap) {
    currency = bank.answerKey.currencyMap[currency];
    mainCurrency = bank.answerKey.currencyMap[mainCurrency];
  }

  const cacheKey = `${bank.bankName}-${currency}`;
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const { data } = await axios.get(bank.baseUrl);

    const filteredData = data.filter(
      (item) =>
        item[bank.answerKey.currency] === currency &&
        item[bank.answerKey.mainCurrency] === mainCurrency
    );

    if (filteredData.length !== 0) {
      exchangeRate = {
        bank: bank.bankName,
        buy: Number(filteredData[0][bank.answerKey.buy]).toFixed(2),
        sale: Number(filteredData[0][bank.answerKey.sale]).toFixed(2),
      };
      cache.set(cacheKey, exchangeRate, 60);
      return exchangeRate;
    } else {
      return errorHandler(`Error: data filtering issue.`);
    }
  } catch (error) {
    return errorHandler(error);
  }
};
