import Joi from "joi";

class ValidationService {
  isValidPath(path) {
    const schema = Joi.object({
      link: Joi.string().uri().required(),
    });

    return schema.validate(path);
  }
}

export default new ValidationService();
