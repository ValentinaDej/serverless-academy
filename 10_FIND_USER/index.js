import express from "express";
import ipValidationMiddlevare from "./middleware/ipValidationMiddlevare.js";
import ipToDecimalMiddleware from "./middleware/ipToDecimalMiddleware.js";
import getCountry from "./controlers/getCountry.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.get("/", ipValidationMiddlevare, ipToDecimalMiddleware, getCountry);

app.use((req, res, next) => {
  res.status(404).json({ error: "Rout not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const start = () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
