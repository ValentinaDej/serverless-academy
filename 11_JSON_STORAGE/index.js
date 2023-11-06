import express from "express";
import getData from "./controlers/getData.js";
import saveData from "./controlers/saveData.js";

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

app.get("/:name", getData);
app.post("/:name", saveData);

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(PORT, () => console.log("Server started on port ", PORT));
