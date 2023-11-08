import ERROR_STATUS_CODE from "../constants/errorStatusCode.js";

const errorHandler = (code, err) => {
  if (err) {
    console.log(`Error: ${err}`);
  }

  const errorMsg =
    ERROR_STATUS_CODE[code] ||
    "Unexpected error occurred while processing your request. Please try again later.";

  return {
    status: code,
    success: false,
    result: { error: errorMsg },
  };
};

export default errorHandler;
