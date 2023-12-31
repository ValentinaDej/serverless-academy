import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mountRoutes from "./routes/index.js";
import errorHandler from "./helpers/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

mountRoutes(app);

app.use((req, res, next) => {
  res.status(404).json({ error: "Rout not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const start = async () => {
  try {
    app.listen(process.env.PORT || 5050, () =>
      console.log(`Server started on port: ${process.env.PORT || 5050}`)
    );
  } catch (error) {
    errorHandler(500, error);
  }
};

start();
