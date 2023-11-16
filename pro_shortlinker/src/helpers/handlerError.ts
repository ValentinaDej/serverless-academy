class handlerError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  static throwError(status: number, message: string) {
    throw new handlerError(status, message);
  }
}

export default handlerError;
