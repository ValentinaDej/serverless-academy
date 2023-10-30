import fs from "fs";
const fsp = fs.promises;
import path from "path";

const directoryPath = "./data";
let fileNames;

(() => {
  const allFiles = fs.readdirSync(directoryPath);
  const directoryContents = [];

  for (const fileName of allFiles) {
    const filePath = path.join(directoryPath, fileName);
    directoryContents.push(filePath);
  }

  fileNames = directoryContents;
})();

async function readFileAsync(fileName, encoding = "utf8") {
  try {
    return await fsp.readFile(fileName, encoding);
  } catch (error) {
    console.error(`Error reading file ${fileName}: ${error.message}`);
    return "";
  }
}

async function uniqueValues() {
  const start = new Date();
  const fileContents = await Promise.all(
    fileNames.map(async (fileName) => {
      const file = await readFileAsync(fileName);
      return file;
    })
  );

  const uniqueValues = new Set();
  fileContents.forEach((fileContent) => {
    const lines = fileContent.split("\n");
    lines.forEach((line) => {
      uniqueValues.add(line);
    });
  });

  console.log(`Unique values: ${uniqueValues.size}`);
  console.log(`1st task duration: ${(new Date() - start) / 1000} s`);
}

async function existInAllFiles() {
  const start = new Date();

  const fileEntriesArrays = await Promise.all(
    fileNames.map(async (fileName) => {
      const file = await readFileAsync(fileName);
      const fileEntries = new Set(file.split("\n"));
      return fileEntries;
    })
  );

  let commonEntries = fileEntriesArrays[0];

  for (let i = 1; i < fileEntriesArrays.length; i++) {
    commonEntries = new Set(
      [...commonEntries].filter((entry) => fileEntriesArrays[i].has(entry))
    );
  }

  console.log(`Values that are in each file: ${commonEntries.size}`);
  console.log(`2nd task duration: ${(new Date() - start) / 1000} s`);
}

async function existInAtleastTen() {
  const start = new Date();

  const fileEntriesArrays = await Promise.all(
    fileNames.map(async (fileName) => {
      const file = await readFileAsync(fileName);
      const fileEntries = new Set(file.split("\n"));
      return fileEntries;
    })
  );

  const entryCounts = new Map();

  for (const fileEntries of fileEntriesArrays) {
    for (const entry of fileEntries) {
      const count = entryCounts.get(entry) || 0;
      if (count < 10) {
        entryCounts.set(entry, count + 1);
      }
    }
  }

  const entriesInAtLeast10Files = [...entryCounts].filter(
    ([entry, count]) => count >= 10
  );

  console.log(
    `Values that are in at least 10 files: ${entriesInAtLeast10Files.length}`
  );
  console.log(`3rd task duration: ${(new Date() - start) / 1000} s`);
}

await uniqueValues();
await existInAllFiles();
await existInAtleastTen();
