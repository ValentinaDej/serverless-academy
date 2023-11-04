import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mountRoutes from "./routes/index.js";

dotenv.config();

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
    console.log(error);
  }
};

start();
