const log4js = require("log4js");
const path = require("path");
const logFilePath = path.resolve(__dirname, "../../logs/application.log");
try {
     log4js.configure({
          appenders: {
               file: {
                    type: "file",
                    filename: logFilePath,
                    maxLogSize: 10485760,
                    backups: 3,
                    category: "app",
               },
               console: {
                    type: "console",
               },
          },
          categories: {
               default: {
                    appenders: ["file", "console"],
                    level: "debug",
               },
          },
     });
} catch (error) {
     console.error("Error configuring log4js:", error);
}

const logger = log4js.getLogger("default");

module.exports = logger;
