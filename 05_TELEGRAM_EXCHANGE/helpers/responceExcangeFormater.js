export const responseExchangeFormatter = (exchangeRates) => {
  let formattedResponse = "";

  for (const rate of exchangeRates) {
    formattedResponse += `🏦 <b>${rate.bank}</b>\n`;
    formattedResponse += `Buying Rate: <b>${rate.buy}</b> UAH\n`;
    formattedResponse += `Selling Rate: <b>${rate.sale}</b> UAH\n\n`;
  }

  return formattedResponse;
};
//  const msg = `\n <b>🏦 PrivatBank</b>\n Buying Rate: <b>${buyRate}</b> UAH \n Selling Rate: <b>${saleRate}</b> UAH \n`;
// const msg = `\n <b>🏦 MonoBank</b>\n Buying Rate: <b>${buyRate}</b> UAH \n Selling Rate: <b>${saleRate}</b> UAH \n`;
// return msg;
