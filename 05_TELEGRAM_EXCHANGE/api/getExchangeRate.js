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
  try {
    const { data } = await axios.get(bank.baseUrl);

    let mainCurrency = "UAH";
    if (bank.answerKey.currencyMap) {
      currency = bank.answerKey.currencyMap[currency];
      mainCurrency = bank.answerKey.currencyMap[mainCurrency];
    }

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
      cache.set(bank.bankName, exchangeRate, 1200);
      return exchangeRate;
    } else {
      return errorHandler(`Error: data filtering issue.`);
    }
  } catch (error) {
    const cachedData = cache.get(bank.bankName);
    if (cachedData) {
      return cachedData;
    } else {
      return errorHandler(error);
    }
  }
};
