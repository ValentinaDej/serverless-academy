import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import errorHandler from "./helpers/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const start = async () => {
  try {
    app.listen(process.env.PORT || 5001, () =>
      console.log(`Server started on port: ${process.env.PORT || 5001}`)
    );
  } catch (error) {
    errorHandler(500, error);
  }
};

start();
