import readline from "readline";

import { commandMenu } from "./interfaces/commandMenu.js";
import { isValidInput, splitIntoArray } from "./utils/dataProcessing.js";
import {
  PROMPT,
  UNHANDLED_COMMAND,
  GOODBYE,
  ERROR_APP,
} from "./constsnts/messages.js";

const app = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function displayCommandMenu() {
  commandMenu.forEach(({ id, title }) => {
    console.log(id + ". " + title);
  });
}

function handleExitCommand(command) {
  if (command.toLowerCase() === "exit") {
    app.close();
    return true;
  }
  return false;
}

function handleCommand(command, line) {
  command = command.trim();
  if (handleExitCommand(command)) return false;

  const selectedCommand = commandMenu.find(
    (item) => item.id === parseInt(command, 10)
  );
  if (!selectedCommand) {
    console.log(UNHANDLED_COMMAND);
    return true;
  }

  console.log(selectedCommand.action(line));
  return true;
}

async function startApp() {
  return new Promise((resolve) => {
    console.log(PROMPT);

    app.once("line", (line) => {
      line = line.trim();

      if (handleExitCommand(line)) {
        return resolve(false);
      }

      const inputArray = splitIntoArray(line);

      if (!isValidInput(inputArray)) {
        console.log(PROMPT);
        return resolve(true);
      }

      displayCommandMenu();

      app.question("Select (1-6) and press ENTER: ", (command) => {
        const shouldContinue = handleCommand(command, inputArray);
        resolve(shouldContinue);
      });
    });
  });
}

(async function () {
  let continueProcessing = true;

  while (continueProcessing) {
    try {
      continueProcessing = await startApp();
    } catch (error) {
      console.log(ERROR_APP);
    }
  }

  console.log(GOODBYE);
})();
