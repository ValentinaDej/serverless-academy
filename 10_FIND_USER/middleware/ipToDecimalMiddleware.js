const ipToDecimalMiddleware = (req, res, next) => {
  const data = req.ip_v4.reduce((acc, octet, index) => {
    return acc + parseInt(octet) * 256 ** (3 - index);
  }, 0);

  if (!data) {
    return res.status(400).json({
      message: "Invalid IP address format",
    });
  }

  req.ipToDecimal = data;
  next();
};

export default ipToDecimalMiddleware;
