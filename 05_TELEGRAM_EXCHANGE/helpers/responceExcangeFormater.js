import { errorHandler } from "./errorHandler.js";

export const responseExchangeFormatter = (exchangeRates, currency) => {
  if (exchangeRates.length === 0 || !currency) {
    return errorHandler("Error: wrong structure exchangeRates.");
  }

  let formattedResponse = "";
  formattedResponse += `💵 <b>${currency} Exchange Rates</b>\n\n`;
  for (let rate of exchangeRates) {
    if (!rate || !rate.bank || !rate.buy || !rate.sale) {
      return badStructureError("Error: wrong structure rate.");
    }
    formattedResponse += `🏦 <b>${rate.bank}</b>\n`;
    formattedResponse += `Buying Rate: <b>${rate.buy}</b> UAH\n`;
    formattedResponse += `Selling Rate: <b>${rate.sale}</b> UAH\n\n`;
  }

  return formattedResponse;
};
