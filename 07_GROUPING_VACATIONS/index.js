import { readFileSync, writeFileSync } from "fs";

const data = readFileSync("db.json");
const developersList = JSON.parse(data);

const developersConvertedList = developersList.reduce(
  (result, { user, startDate, endDate }) => {
    const matchedIndex = result.findIndex((item) => item.userId === user._id);

    if (matchedIndex !== -1) {
      result[matchedIndex].vacations.push({ startDate, endDate });
    } else {
      result.push({
        userId: user._id,
        userName: user.name,
        vacations: [{ startDate, endDate }],
      });
    }

    return result;
  },
  []
);

writeFileSync(
  "output.json",
  JSON.stringify(developersConvertedList, null, 2),
  "utf8"
);
