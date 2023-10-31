import fs from "fs";
const fsp = fs.promises;
import path from "path";

const directoryPath = "./data";

const getFiles = async () => {
  try {
    const allFiles = await fsp.readdir(directoryPath);
    const directoryContents = await Promise.all(
      allFiles.map((fileName) => path.join(directoryPath, fileName))
    );

    if (directoryContents.length === 0) {
      console.error(`Error: Directory ${directoryPath} is empty`);
      process.exit(1);
    }
    return directoryContents;
  } catch (error) {
    console.error(`Error reading directory ${directoryPath}: ${error.message}`);
    process.exit(1);
  }
};

const getFilesContent = async () => {
  const directoryContents = await getFiles();

  const fileContent = await Promise.all(
    directoryContents.map(async (fileName) => {
      try {
        return await fsp.readFile(fileName, "utf8");
      } catch (error) {
        console.error(`Error reading file ${fileName}: ${error.message}`);
        return "";
      }
    })
  );
  return fileContent;
};

async function uniqueValues(fileContents) {
  const uniqueValues = new Set();
  fileContents.forEach((fileContent) => {
    const lines = fileContent.split("\n");
    lines.forEach((line) => {
      uniqueValues.add(line);
    });
  });

  return uniqueValues.size;
}

async function existInAllFiles(fileContents) {
  const commonEntries = new Set(fileContents[0].split("\n"));

  for (let i = 1; i < fileContents.length; i++) {
    const fileEntries = new Set(fileContents[i].split("\n"));
    commonEntries.forEach((entry) => {
      if (!fileEntries.has(entry)) {
        commonEntries.delete(entry);
      }
    });
  }

  return commonEntries.size;
}

async function existInAtleastTen(fileContents) {
  const entryCounts = new Map();

  for (const fileContent of fileContents) {
    const uniqueLines = new Set(fileContent.split("\n"));

    for (const line of uniqueLines) {
      entryCounts.set(line, (entryCounts.get(line) || 0) + 1);
    }
  }

  const entriesInAtLeast10Files = [...entryCounts].filter(
    ([entry, count]) => count >= 10
  );

  return entriesInAtLeast10Files.length;
}

async function resultProcessing(name, task, data) {
  const start = new Date();
  try {
    const result = await task(data);
    console.log(
      `${name}: ${result} - duration: ${(new Date() - start) / 1000} s`
    );
  } catch (error) {
    console.error(`${name} failed: ${error.message}`);
  }
}

(async () => {
  const fileContents = await getFilesContent();
  await resultProcessing("Unique values", uniqueValues, fileContents);
  await resultProcessing("Values in each file", existInAllFiles, fileContents);
  await resultProcessing(
    "Values in at least 10 files",
    existInAtleastTen,
    fileContents
  );
})();
