const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const log4js = require("log4js");
const logger = log4js.getLogger("default");
const secretKey = config.api.secretKey;
//Token List
let tokenList = new Map();
const generateToken = async (payload) => {
     let token = tokenList.get(payload.username);
     if (token) {
          try {
               await jwt.verify(token, secretKey);
               return token;
          } catch (error) {
               logger.error(`Alert token login  : ${payload.username} `);
          }
     }
     token = jwt.sign({ payload }, secretKey, { expiresIn: "1h" }); // Adjust the expiration time as needed
     tokenList.set(payload.username, token);
     return token;
};

const auth = (req, res, next) => {
     const token = req.headers.authorization;

     if (!token) {
          return res.status(401).json({ error: "Unauthorized: Token not provided" });
     }

     jwt.verify(token, secretKey, (err, decoded) => {
          if (err) {
               return res.status(401).json({ error: "Unauthorized: Invalid token" });
          }

          req.user = decoded; // Attach the decoded user information to the request object
          next();
     });
};

module.exports = {
     generateToken,
     auth,
};
