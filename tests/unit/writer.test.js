import Writer from "../../src/core/writer.js";
import Mocker from "../mocker.js";

import fs from "fs";

const mocker = new Mocker();

const BASE_PATH = "./output";
const SAMPLE_PATH = `default.txt`;
const DYNAMIC_PATH = mocker.mockFilePath(5);

describe("WRITE FILES", () => {
  beforeAll(() => {
    if (!fs.existsSync(BASE_PATH)) {
       return fs.mkdirSync(BASE_PATH);
    }
  });
  it("should write an generic hello-world file", async () => {
    let worker = new Writer(`${BASE_PATH}/${SAMPLE_PATH}`);
    worker.createFile("hello-world\n");
    expect(fs.readFileSync(`${BASE_PATH}/${SAMPLE_PATH}`)).toBeDefined();
  });
  it("should write the file in the provided random path", async () => {
    let FILENAME = mocker.mockFilePath(5);
    let worker = new Writer(`${BASE_PATH}/${DYNAMIC_PATH}`);
    worker.createFile(mocker.mockFileContent(60));
    expect(fs.readFileSync(`${BASE_PATH}/${DYNAMIC_PATH}`)).toBeDefined();
  });
  it("should not create a file without provided path, and throw an error", async () => {
    expect(() => {
      new Writer();
    }).toThrow();
  });
});
