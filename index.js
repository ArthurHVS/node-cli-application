#!/usr/bin/env node

import "@babel/register";
import "@babel/polyfill";

import Converter from "./src/app.js";
import { errorHandler } from "./src/utilities/error-handler.js";
import { ERROR_MESSAGES } from "./src/utilities/enumerations.js";

if (process.argv.length < 4) {
  errorHandler(ERROR_MESSAGES.insuficientArguments);
}

const app = new Converter(process.argv);
app.convert();
