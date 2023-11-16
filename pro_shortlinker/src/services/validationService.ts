import handlerError from "../helpers/handlerError";
import { EXP_TIME } from "../constants/expirationTime";

class ValidationService {
  isValidEmail(email: string): void {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      handlerError.throwError(400, "Bad Request: invalid email");
    }
  }

  isValidPassword(password: string): void {
    if (!password || password?.length < 8 || password?.length > 20) {
      handlerError.throwError(
        400,
        "Bad Request: password length must be from 8 to 20 characters"
      );
    }
  }

  isValidTime(expiration_time: string): void {
    const options = Object.keys(EXP_TIME);
    if (!options.includes(expiration_time)) {
      handlerError.throwError(
        400,
        `Bad Request: choose correct expiration time format - ${options}`
      );
    }
  }

  isValidLink(link: string): void {
    if (link.startsWith("http://") || link.startsWith("https://")) {
    } else {
      handlerError.throwError(
        400,
        "Bad Request: link must start with 'http://' or 'https://'"
      );
    }
  }
}

export default new ValidationService();
