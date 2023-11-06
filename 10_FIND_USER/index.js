import express from "express";
import ipValidationMiddlevare from "./middleware/ipValidationMiddlevare.js";
import ipToDecimalMiddleware from "./middleware/ipToDecimalMiddleware.js";
import getCountry from "./controlers/getCountry.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use("/", ipValidationMiddlevare, ipToDecimalMiddleware, getCountry);

const start = () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
