import fs from "fs";
import path from "path";
import { ERROR_MESSAGES } from "../utilities/enumerations.js";
import { errorHandler } from "../utilities/error-handler.js";

/** File writer class */
export default class Writer {
  constructor(filePath) {
    if (filePath) {
      const solvedPath = path.resolve(filePath);
      this.stream = fs.createWriteStream(solvedPath);
    } else {
      errorHandler(ERROR_MESSAGES.undefinedLogPath);
    }
  }
  createFile(content) {
    this.stream.write(content);
  }
}
