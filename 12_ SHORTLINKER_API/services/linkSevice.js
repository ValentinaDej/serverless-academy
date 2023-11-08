import url from "url";
import * as db from "../db.js";
import DBSecvice from "./dbSecvice.js";

class LinkService {
  #URL_CHARACTERS =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-";
  #SHORT_PATH_LENGTH = 6;

  async #createLinkTable() {
    try {
      await DBSecvice.createTable("links", [
        "id UUID PRIMARY KEY DEFAULT uuid_generate_v4()",
        "actual VARCHAR(255) NOT NULL",
        "short VARCHAR(255)",
      ]);
    } catch (error) {
      return errorHandler(400, error);
    }
  }

  #shuffleString = (str) => {
    const chars = str.split("");
    for (let i = chars.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars.join("");
  };

  #generateString = () => {
    const newString = this.#shuffleString(this.#URL_CHARACTERS);
    return newString.substring(0, this.#SHORT_PATH_LENGTH);
  };

  #generateShortLink = (short) => {
    return url.format({
      protocol: "http",
      hostname: "localhost",
      port: process.env.PORT || 5001,
      pathname: short,
    });
  };

  async addLink(actual) {
    if (!actual) {
      return errorHandler(400);
    }

    const tableExist = await DBSecvice.tableExist("links");

    if (!tableExist) {
      this.#createLinkTable();
    }

    const recordExist = await DBSecvice.recordExist("public.links", [
      { name: "actual", value: actual },
    ]);

    if (recordExist) {
      return this.#generateShortLink(recordExist.short);
    }

    const short = this.#generateString();
    await db.query(
      "INSERT INTO public.links (actual, short) VALUES ($1,$2) RETURNING *",
      [actual, short]
    );
    return this.#generateShortLink(short);
  }

  async getLink(short) {
    if (!short) {
      return errorHandler(400);
    }

    const recordExist = await DBSecvice.recordExist("public.links", [
      { name: "short", value: short },
    ]);

    if (recordExist) {
      return recordExist.actual;
    }
  }
}

export default new LinkService();
