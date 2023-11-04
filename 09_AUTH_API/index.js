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
