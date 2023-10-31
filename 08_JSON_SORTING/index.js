import http from "http";
import https from "https";

import { endpointList, endpointListLocalServer } from "./endpointList.js";

const args = process.argv.slice(2);
let endpoints;
let mode;
if (args.includes("--test")) {
  endpoints = endpointListLocalServer;
  mode = http;
} else {
  endpoints = endpointList;
  mode = https;
}

const findIsDone = (obj) => {
  if (obj.isDone !== undefined) {
    return obj.isDone;
  }
  for (const key in obj) {
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      return findIsDone(obj[key]);
    }
  }
};

const fetchEndpoint = (url, mode) => {
  return new Promise((resolve, reject) => {
    mode
      .get(url, (response) => {
        if (response.statusCode === 200) {
          let data = "";
          response.on("data", (chunk) => {
            data += chunk;
          });
          response.on("end", () => {
            resolve(JSON.parse(data));
          });
        } else {
          reject(new Error(`HTTP Error: ${response.statusCode}`));
        }
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

(async () => {
  let trues = 0;
  let falses = 0;

  for (const endpoint of endpoints) {
    try {
      const data = await fetchEndpoint(endpoint, mode);
      const status = findIsDone(data);
      console.log(`[Success] ${endpoint}: isDone - ${status}`);
      status ? (trues += 1) : (falses += 1);
    } catch (error) {
      console.log(`[Error] ${endpoint}: ${error.message}`);
    }
  }

  console.log(`Found True values: ${trues}`);
  console.log(`Found False values: ${falses}`);
})();
