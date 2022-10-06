import Downloader from "./core/downloader.js";
import Writer from "./core/writer.js";

import {
  ERROR_MESSAGES,
  LINE_SEPARATOR,
  NO_CHAR,
  QUOTE_CHAR,
  SPACE_CHAR,
  VERTICAL_BAR,
  AGORA_FIELD_HEADER,
} from "./utilities/enumerations.js";
import { errorHandler } from "./utilities/error-handler.js";

/** Main application class
 * Depends on both Writer and Downloader classes, creating instances of them
 * in the constructor.
 */
export default class Converter {
  constructor(argv) {
    /** These unused consts are here for clarity
     * We can, for example, use something like
     * argv[3] to get the path, but i think that is not clear at all. */
    if (argv) {
      const [nodePath, scriptPath, providedUrl, providedPath] = [...argv];

      this.writer = new Writer(providedPath);
      this.downloader = new Downloader(providedUrl);
      this.cdnBlock = "";
    }
    else {
      errorHandler('no-argv-array')
    }
  }


  splitLines(str) {
    try {
      return str.split(LINE_SEPARATOR);
    } catch (err) {
      errorHandler(ERROR_MESSAGES.cannotSplitString);
    }
  }

  async constructAgoraBlock() {
    let agoraBlock = [];
    this.cdnBlock = await this.downloader.getFile();
    const cdnArray = this.splitLines(this.cdnBlock);
    cdnArray.forEach((log) => {
      try {
        if (log === NO_CHAR) {
          /** Sometimes the file is coming with an empty line in the end...
           * when that happens, we simply ignore the line
           */
        } else {
          let fields = log.split(VERTICAL_BAR);

          /** Provider is not in the enumerations because
           * it most likely to be changed during execution
           */
          let provider = `${QUOTE_CHAR}MINHA CDN${QUOTE_CHAR}`;

          let [responseSize, statusCode, cacheStatus, httpString, timeTaken] =
            fields;
          let httpMethod = httpString
            .split(SPACE_CHAR)[0]
            .replace(QUOTE_CHAR, NO_CHAR);
          let uriPath = httpString
            .split(SPACE_CHAR)
            .pop()
            .replace(QUOTE_CHAR, NO_CHAR);
          timeTaken = Number(timeTaken).toFixed(0);

          agoraBlock.push(
            `${provider} ${httpMethod} ${statusCode} ${uriPath} ${timeTaken} ${responseSize} ${cacheStatus}\n`
          );
        }
      } catch (err) {
        errorHandler(err.message);
      }
    });
    return agoraBlock;
  }

  constructAgoraHeader() {
    let headers = AGORA_FIELD_HEADER;
    let date = new Date();

    return `#Version: 1.0\n#Date ${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}\n#Fields: ${headers}\n`;
  }

  async convert() {
    try {
      let agoraBlock = await this.constructAgoraBlock(this.cdnBlock);
      let baseStr = this.constructAgoraHeader();
      agoraBlock.forEach((element) => {
        baseStr += element;
      });
      this.writer.createFile(baseStr);
    } catch (err) {
      errorHandler(err.message);
    }
  }
}
