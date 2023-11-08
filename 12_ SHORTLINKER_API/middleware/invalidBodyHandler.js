import ValidationService from "../services/validationService.js";

export const invalidBodyHandler = (req, res, next) => {
  const validationResult = ValidationService.isValidPath(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      error: "Invalid or missing value for field: link",
    });
  }
  next();
};

export default invalidBodyHandler;
