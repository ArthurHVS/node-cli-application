import Converter from "../../src/app.js";
import fs from "fs";

import Mocker from "../mocker.js";
import { ERROR_MESSAGES } from "../../src/utilities/enumerations.js";
import Downloader from "../../src/core/downloader.js";
import Writer from "../../src/core/writer.js";
const mocker = new Mocker();

const CDN_URL =
  "https://s3.amazonaws.com/uux-itaas-static/minha-cdn-logs/input-01.txt";
const BASE_PATH = "./output";
const SAMPLE_PATH = `default.txt`;
const DYNAMIC_PATH = mocker.mockFilePath(5);

describe("LOG CONVERTER", () => {
  beforeAll(() => {
    if (!fs.existsSync(BASE_PATH)) {
      return fs.mkdirSync(BASE_PATH);
    }
  });
  it("instances should have all dependecies working", async () => {
    let worker = new Converter([
      ...mocker.mockArgvArray(),
      `${BASE_PATH}/${SAMPLE_PATH}`,
    ]);

    expect(worker.downloader).toBeInstanceOf(Downloader);
    expect(worker.writer).toBeInstanceOf(Writer);
  });

  it("instances should have all inner methods defined", async () => {
    let worker = new Converter([
      ...mocker.mockArgvArray(),
      `${BASE_PATH}/${SAMPLE_PATH}`,
    ]);

    expect(worker.splitLines).toBeInstanceOf(Function);
    expect(worker.constructAgoraHeader).toBeInstanceOf(Function);
    expect(worker.constructAgoraBlock).toBeInstanceOf(Function);
    expect(worker.convert).toBeInstanceOf(Function);
  });

  it("should throw error when trying to split undefined", async () => {
    let worker = new Converter([
      ...mocker.mockArgvArray(),
      `${BASE_PATH}/${SAMPLE_PATH}`,
    ]);
    expect(() => {
      worker.splitLines(undefined);
    }).toThrow(ERROR_MESSAGES.cannotSplitString);
  });

  it("should create the headers of new logs properly", async () => {
    let worker = new Converter([
      ...mocker.mockArgvArray(),
      `${BASE_PATH}/${SAMPLE_PATH}`,
    ]);
    let header = await worker.constructAgoraHeader();
    expect(typeof header).toBe("string");
  });

  it("should create the block of new logs properly", async () => {
    let worker = new Converter([
      ...mocker.mockArgvArray(),
      `${BASE_PATH}/${SAMPLE_PATH}`,
    ]);
    const block = await worker.constructAgoraBlock();
    expect(block).toBeInstanceOf(Array);
  });

  it("should create converted log file, using provided content", async () => {
    let worker = new Converter([
      ...mocker.mockArgvArray(),
      `${BASE_PATH}/${DYNAMIC_PATH}`,
    ]);
    await worker.convert();
    expect(fs.readFileSync(`${BASE_PATH}/${DYNAMIC_PATH}`)).toBeDefined();
  });
  it("should throw error when trying to get cdnBlock with no arguments", async () => {
    expect(() => {
      new Converter();
    }).toThrow();
  });
});
