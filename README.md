# Log Converter

## Main goals:
This project mean to be an introduction on how an client application can be made and installed with Node.js. It contains automated tests and use some Object Oriented Programming concepts.

The application converts logs with given formats, basically.

## Installation:
This project was intended to be used somewhat like an npm package, so, to install it you have to execute the following command into the project root folder:

`npm install -g .`

This works because we have an "bin" field into the `package.json`, who is telling the npm how to install the package, referred by "main" field in the same file.

Another thing to notice is the first-line comment into the `index.js`, which tells the computer where to find node environment, in a way that is similar to bash-scripts.

## Code structure and dependencies:
The main module of the package is `index.js`. That module imports the Converter class, which is in the `./src` folder. It also imports babel's register and polyfill structures so jest and also other ECMAscript environments (old node versions, other interpreters, etc.) can run the package. This one imports both the Downloader and the Writer classes (present into the `./src/utilities` folder), and then construct instances of theses classes within the methods.

The Downloader class is constructed on top of an [Axios](https://axios-http.com/docs/intro) instance, used only to get the old-style log file in the provided url. We choose to depend on this package mainly because the global fetch method still an experimental feature (v18.8.0) and the package implementation is simple, effective and widely used by industry.

The Writer class is constructed using Node.js [native FileSystem](https://nodejs.org/api/fs.html). It only creates an writeStream to an provided path and, well, writes on it. Simple as that.

We also depends on [Jest](https://jestjs.io/) to run our tests. We could also choose the experimental test-runners feature to the job, but we choose to stick with the stable libs.

## Usage:
To use the converter, you have to call:

`convert http://url.com abc.txt`

We use process.argv[] to check command line arguments and deal with them, so if you don't put at least two arguments (which means process.argv has 4 elements) the applications throws an error and stops.

The application expects to receive logs in the specified format, and if it doesn't, also crashes with an error.

If the provided url has the logs and anything bad happens, we gonna have the converted `abc.txt`, into the package root folder.

### How the conversion works:
The conversion works by three steps:
- First, we split the lines of the input, using the carriage return character. To this job, we have an inner method which only returns the result of `input.split("\n")`.
- After this, we split each line using the "|" character. Notice that every character used in these operations are enumerated (into the `./src/utilities/enumerations.js` file), so we can easily change the behavior of the package.
- Then, we have to 're-order' this splitted data. To this, we use some destructuring assignments within every splitted array (or line) and also some replaces to get rid of some 'trash chars'. 
- After assign every variable, we finally construct the new log file content, constructing and formatting the log date and using an template string to print the actual log data.
- With the content string constructed, we simply write the file into the provided path.

### Debug and Test:
To debug this package we recommend to use VSCode. To demonstration purposes, the `./.vscode/` folder is shipped in the repository, which is usually not a good idea. In many cases, we have some sensible-data in that files, like keys and environment variables. To debug, you can simply hit the debugger button

To test the package we can run "npm test". The tests are made in jest, and the coverage reports are automatically generated (using istambul). These reports are not shipped into the repository, so you can see we are not cheating here!

The test strategy is to randomly create an mock input and assert the output format. To create these mocks we have an `mocker.js` file  By now, the test coverage of the project is 97.04%. The tests are generating output files into `/output`, which can be also easily changed.

### Code Linting:
This project uses eslintrc to assert code-quality. Our configuration file is mostly inspired by (and extends) the AirBnB standards.

To lint (and fix) the code formatting, you can run `npm run lint --fix`.

### Setup:
This project was developed using VSCode, which also provides us the debugger platform.

We are versioning the code using git. To create git-hooks, we are using husky, which allows us to assert good commit messages, branch names and to lint the code before the commits. In our demonstration case, it just runs the tests in the pre-commit hook. If you don't want to run the test suites, use the flag `--no-verify` when commiting.

The runtime code is generated by Babel, aiming to allow any node version to run the package. This 'bundled' package is the target of "bin" field into the `package.json`

## Questions?

Let me know! Send an email to [arthur.hvs@gmail.com](mail:arthur.hvs@gmail.com)