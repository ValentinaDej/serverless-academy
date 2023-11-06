import StorageService from "../services/storageService.js";

const getData = async (req, res, next) => {
  const name = req.originalUrl;

  if (!name) {
    return res.status(400).json({ message: "Path is wrong" });
  }

  if (!req.is("application/json")) {
    return res.status(400).json({ message: "Data structure is not valid" });
  }
  try {
    const data = await StorageService.getData(name);
    res.status(200).json({ ...data });
  } catch (error) {
    next(error);
  }
};

export default getData;
