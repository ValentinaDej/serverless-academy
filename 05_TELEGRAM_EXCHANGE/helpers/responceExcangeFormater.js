import { badStructureError } from "./errorHandler.js";

export const responseExchangeFormatter = (exchangeRates, currency) => {
  if (!exchangeRates || exchangeRates.length === 0 || !currency) {
    return badStructureError("exchangeRates");
  }

  let formattedResponse = "";
  formattedResponse += `💵 <b>${currency} Exchange Rates</b>\n\n`;
  for (let rate of exchangeRates) {
    if (!rate || !rate.bank || !rate.buy || !rate.sale) {
      return badStructureError("rate");
    }
    formattedResponse += `🏦 <b>${rate.bank}</b>\n`;
    formattedResponse += `Buying Rate: <b>${rate.buy}</b> UAH\n`;
    formattedResponse += `Selling Rate: <b>${rate.sale}</b> UAH\n\n`;
  }

  return formattedResponse;
};
