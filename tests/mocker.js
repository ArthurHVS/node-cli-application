const CHAR_BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const METHODS_BASE = [
  "GET",
  "HEAD",
  "POST",
  "PUT",
  "DELETE",
  "CONNECT",
  "OPTIONS",
  "PATCH",
];
const HTTP_STATUS_BASE = ["100", "200", "201", "401", "403", "404", "500"];
const CACHE_STATUS_BASE = [
  "NOCACHE",
  "NONE",
  "REFRESH_MISS",
  "EXPIRED_HIT",
  "EXPIRED_MISS",
  "HIT",
  "MISS",
  "PARTIABLE_HIT",
  "UNCACHEABLE",
];

export default class Mocker {
  dynamicVariable = Math.floor(Math.random() * 100);

  mockFilePath(length) {
    let result = "";

    for (let i = 0; i < length; i++) {
      result += CHAR_BASE.charAt(Math.floor(Math.random() * CHAR_BASE.length));
    }
    return `${result}.txt`;
  }
  mockArgvArray() {
    const CDN_URL =
      "https://s3.amazonaws.com/uux-itaas-static/minha-cdn-logs/input-01.txt";
    const mockedArgv = ["node-env-mock", "convert", CDN_URL];
    return mockedArgv;
  }
  mockFileContent(lines) {
    let result = "";

    for (let i = 0; i < lines; i++) {
      let mockResponseSize = (Math.random() * 1000).toFixed(0);
      let mockTimeTaken = (Math.random() * 1000).toFixed(1);
      let mockResponseStatus =
        HTTP_STATUS_BASE[Math.floor(Math.random() * HTTP_STATUS_BASE.length)];
      let mockCacheStatus =
        CACHE_STATUS_BASE[Math.floor(Math.random() * CACHE_STATUS_BASE.length)];
      let mockHttpMethod =
        METHODS_BASE[Math.floor(Math.random() * METHODS_BASE.length)];
      result += `${mockResponseSize}|${mockResponseStatus}|${mockCacheStatus}|"${mockHttpMethod} HTTP/1.1"|${mockTimeTaken}\n`;
    }
    return result;
  }
}
