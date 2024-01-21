// loggerMiddleware.js
const logger = require("../utils/logger");

const logRequest = (req, res, next) => {
     logger.info({
          message: "Request received",
          method: req.method,
          url: req.originalUrl,
          body: req.body,
          query: req.query,
     });
     next();
};

const logResponse = (req, res, next) => {
     const originalSend = res.send;

     // Capture the response body
     let responseBody = "";

     res.send = function (body) {
          responseBody = body;
          originalSend.apply(res, arguments);
     };

     // Log the response details after the response is sent
     res.on("finish", () => {
          logger.info({
               message: "Response sent",
               method: req.method,
               url: req.originalUrl,
               status: res.statusCode,
               body: responseBody,
          });
     });

     next();
};

module.exports = { logRequest, logResponse };
