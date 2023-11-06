import isValidIP from "../helpers/isValidIP.js";

const ipValidationMiddlevare = (req, res, next) => {
  const ip_v4 = req.headers["x-forwarded-for"].split(".");

  const validIP = isValidIP(ip_v4);

  if (!validIP) {
    return res.status(400).json({
      message: "Invalid IP address format",
    });
  }
  req.ip_v4 = ip_v4;
  next();
};

export default ipValidationMiddlevare;
