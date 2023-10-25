import fs from "fs";

export function getEnvVariables() {
  if (fs.existsSync(".env")) {
    const envFileContent = fs.readFileSync(".env", "utf8");
    const lines = envFileContent.split("\n");

    for (const line of lines) {
      const [key, value] = line.split("=");
      if (key && value) {
        process.env[key.trim()] = value.trim();
      }
    }
  }
}
