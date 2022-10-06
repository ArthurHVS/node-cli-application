import axios from "axios";
import { ERROR_MESSAGES } from "../utilities/enumerations.js";
import { errorHandler } from "../utilities/error-handler.js";

/** Downloader class */
export default class Downloader {
  constructor(url) {
    if (url) {
      this.axiosInstance = this.createAxiosInstance();
      this.url = url;
    } else {
      errorHandler(ERROR_MESSAGES.undefinedLogUrl);
    }
  }
  createAxiosInstance() {
    return axios.create();
  }
  async getFile() {
    const response = await this.axiosInstance.get(this.url);
    if (response.data) {
      return response.data;
    } else errorHandler(ERROR_MESSAGES.undefinedResponse);
  }
}
