import ValidationService from "../services/validationService.js";

const authValidationMiddlevare = (req, res, next) => {
  const { email, password } = req.body;

  if (!ValidationService.isValidEmail(email)) {
    return res.status(400).json({
      message:
        "Invalid email format. Please provide a valid email address in the format 'example@example.com'",
    });
  }

  if (!ValidationService.isValidPassword(password)) {
    return res
      .status(400)
      .json({ message: "Password must be 8-20 characters long" });
  }

  next();
};

export default authValidationMiddlevare;
