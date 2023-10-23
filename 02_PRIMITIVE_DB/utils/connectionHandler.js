import path from "path";
import fs from "fs";

const dbDirPath = path.join(process.cwd(), "db");
const filePath = path.join(dbDirPath, "db.txt");

const createDatabase = () => {
  if (!fs.existsSync(dbDirPath)) {
    fs.mkdirSync(dbDirPath);
  }

  if (!fs.existsSync(filePath)) {
    try {
      fs.writeFileSync(filePath, JSON.stringify([]), { encoding: "utf8" });
      console.log("Database successfully created!");
    } catch (error) {
      console.log(`Error creating the database: ${error}`);
    }
  }
};

const validateDatabaseContent = () => {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const content = fs.readFileSync(filePath, { encoding: "utf8" });

  if (!content) {
    fs.writeFileSync(filePath, JSON.stringify([]), { encoding: "utf8" });
    console.log("Database was empty. Initialized with basic structure.");
    return true;
  }

  try {
    const parsedContent = JSON.parse(content);
    return true;
  } catch (error) {
    console.log("Error parsing the database content.");
    console.log(`Check file structure at ${filePath}`);
    console.log(`Error: ${error.message}`);
    return false;
  }
};

export const connectToDatabase = () => {
  createDatabase();

  if (!validateDatabaseContent()) {
    process.exit(1);
  }
};
