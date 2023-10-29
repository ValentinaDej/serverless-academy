import axios from "axios";

import { API_BANK } from "../constants/index.js";

export const getAllExchangeRates = async (currency) => {
  try {
    const exchangeRates = [];

    for (const bank of API_BANK) {
      const exchangeRate = await getExchangeRate(bank, currency);

      exchangeRates.push(exchangeRate);
    }

    return exchangeRates;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw error;
  }
};

const getExchangeRate = async (bank, currency) => {
  try {
    const { data } = await axios.get(bank.baseUrl);

    if (bank.answerKey.currencyMap) {
      currency = bank.answerKey.currencyMap[currency];
    }

    const filteredData = data.filter(
      (item) => item[bank.answerKey.currency] === currency
    );

    return {
      bank: bank.bankName,
      buy: Number(filteredData[0][bank.answerKey.buy]).toFixed(2),
      sale: Number(filteredData[0][bank.answerKey.sale]).toFixed(2),
    };
  } catch (error) {
    console.error(`Error fetching exchange rate from ${bank.bankName}:`, error);
    throw error;
  }
};
