import inquirer from "inquirer";

import { connectToDatabase } from "./utils/connectionHandler.js";
import { dbReader, dbWriter } from "./utils/dataHandler.js";

const questions = [
  {
    type: "input",
    name: "name",
    message: "Enter the user's name. To cancel press ENTER",
  },
  {
    type: "list",
    name: "gender",
    message: "Choose the gender",
    choices: ["male", "female", "other"],
    when: (answers) => answers.name.trim() !== "",
  },
  {
    type: "input",
    name: "age",
    message: "Choose the age",
    when: (answers) => answers.name.trim() !== "",
    validate(answer) {
      return isNaN(answer) ? "Enter just a number" : true;
    },
  },
  {
    type: "confirm",
    name: "searchMode",
    message: "Would you like to search users in DB?",
    when: (answers) => !answers.name && !answers.age,
  },
  {
    type: "input",
    name: "searchData",
    message: "Enter user's name you want to find in DB",
    when(answers) {
      if (answers.searchMode) {
        dbReader();
      }
      return answers.searchMode;
    },
  },
];

(async function () {
  connectToDatabase();

  let continueRunning = true;

  while (continueRunning) {
    try {
      const answers = await inquirer.prompt(questions);

      if (answers.searchMode) {
        dbReader(answers.searchData);
        continue;
      }

      if (answers.name && answers.gender && answers.age) {
        dbWriter(answers);
      } else {
        continueRunning = false;
      }
    } catch (error) {
      if (error.isTtyError) {
        console.log(
          "This application requires an interactive console environment to run properly. Please make sure you're using a standard terminal or command prompt."
        );
      } else {
        console.log(error);
      }
      continueRunning = false;
    }
  }
})();
