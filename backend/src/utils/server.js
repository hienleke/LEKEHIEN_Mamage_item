const express = require("express");
const bodyParser = require("body-parser");
const itemRouters = require("../routers/itemRoutes");
const categoryRouters = require("../routers/categoryRouters");
const authRoutes = require("../routers/authRoutes");
const { logRequest, logResponse } = require("../middleware/logMiddleware");
function createServer() {
     const app = express();

     app.use(bodyParser.json());
     app.use(logRequest);
     app.use(logResponse);
     app.use("/api/item", itemRouters);
     app.use("/api/category", categoryRouters);
     app.use("/api/login", authRoutes);

     return app;
}

module.exports = createServer;
