import path from "path";
import fs from "fs";

const dbDirPath = path.join(process.cwd(), "db");
const filePath = path.join(dbDirPath, "db.txt");

export const dbReader = (searchData) => {
  const jsonData = fs.readFileSync(filePath, { encoding: "utf8" });
  const data = JSON.parse(jsonData);

  if (searchData) {
    const users = data.filter(
      (el) => el.name.toLowerCase() === searchData.toLowerCase()
    );

    if (!users.length) {
      console.log("No such user exists in DB!");
      return;
    }

    console.log(
      `The user ${searchData} was found. Total users with this name: ${users.length}`
    );
    console.log(JSON.stringify(users, null, 2));
    return;
  }

  console.log(data);
};

export const dbWriter = (data) => {
  const jsonData = fs.readFileSync(filePath, "utf8");
  const currentData = JSON.parse(jsonData);

  currentData.push(data);

  fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2), "utf8");
  console.log("New user has been added to the database!");
};
