import fs from "fs";
import csv from "csv-parser";

const getCountry = async (req, res, next) => {
  const stream = fs.createReadStream("./IP2LOCATION.CSV");
  let country = "";
  stream.pipe(csv()).on("data", (data) => {
    if (
      +data.startPoint < +req.ipToDecimal &&
      +req.ipToDecimal < +data.endPoint
    ) {
      country = data.countryFull;
      if (country) {
        res.status(200).json({
          ip: req.ip_v4.join("."),
          country,
        });
      } else {
        res.status(400).json({
          message: "Bad request",
        });
      }
      stream.destroy();
    }
  });
};

export default getCountry;
