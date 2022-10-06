import Downloader from "../../src/core/downloader.js";

const SAMPLE_URL = "https://filesamples.com/samples/document/txt/sample3.txt";
const PROVIDED_URL =
  "https://s3.amazonaws.com/uux-itaas-static/minha-cdn-logs/input-01.txt";
let sampleFile, providedFile;
describe("DOWNLOAD LOGS", () => {
  it("should download an generic text file", async () => {
    const worker = new Downloader(SAMPLE_URL);
    sampleFile = await worker.getFile();
    expect(sampleFile).toBeDefined();
  });
  it("should download the provided log file", async () => {
    const worker = new Downloader(PROVIDED_URL);
    providedFile = await worker.getFile();
    expect(providedFile).toBeDefined();
  });
  it("should throw error with no url", async () => {
    expect(() => {
      new Downloader();
    }).toThrow();
  });
});