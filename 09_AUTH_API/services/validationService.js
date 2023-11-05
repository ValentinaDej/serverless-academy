class ValidationService {
  isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  isValidPassword(password) {
    return password && password?.length >= 8 && password?.length <= 20;
  }
}

export default new ValidationService();
