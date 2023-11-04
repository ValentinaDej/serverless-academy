import jwt from "jsonwebtoken";
import ERROR_STATUS_CODE from "../constants/errorStatusCode.js";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  const errorMsg = { success: false, error: ERROR_STATUS_CODE[401] };

  if (!token) {
    return res.status(401).send(errorMsg);
  }

  jwt.verify(token, process.env.ACCESS_SECRET, async (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send(errorMsg);
    }
    req.userId = decoded.id;
    next();
  });
};

export default authMiddleware;
