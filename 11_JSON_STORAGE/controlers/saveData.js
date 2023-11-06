import StorageService from "../services/storageService.js";

const saveData = async (req, res, next) => {
  const name = req.originalUrl;
  const data = req.body;

  if (!name) {
    return res.status(400).json({ message: "Path is wrong" });
  }

  if (!data) {
    return res.status(400).json({ message: "No data" });
  }

  if (!req.is("application/json")) {
    return res.status(400).json({ message: "Data structure is not valid" });
  }
  try {
    await StorageService.saveData(name, data);
    res.status(200).json({ ...data });
  } catch (error) {
    next(error);
  }
};

export default saveData;
