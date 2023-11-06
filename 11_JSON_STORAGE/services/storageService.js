import path from "path";
import { writeFile, readFile } from "fs/promises";

class StorageService {
  #getFilePath(name) {
    const nameArr = name.split("/");
    const fileName = `${nameArr.pop().toLowerCase()}.json`;
    const dbDirPath = path.join(process.cwd(), "db");
    return path.join(dbDirPath, fileName);
  }

  async getData(name) {
    const filePath = this.#getFilePath(name);

    try {
      const data = await readFile(filePath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      throw new Error("No file found by this path");
    }
  }

  async saveData(name, data) {
    const filePath = this.#getFilePath(name);

    try {
      await writeFile(filePath, JSON.stringify(data), "utf-8");
    } catch (error) {
      throw new Error("File was not saved. ");
    }
  }
}

export default new StorageService();
