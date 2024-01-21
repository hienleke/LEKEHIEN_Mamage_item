const createServer = require("./src/utils/server");
const log = require("./src/utils/logger");
const config = require("./src/utils/config");
const { connectDB } = require("./src/utils/connectDB");
const associated = require("./src/models");

connectDB();
associated();
const port = config.app.port || 3001;
// Set up routes
const app = createServer();

app.listen(port, () => {
     console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
