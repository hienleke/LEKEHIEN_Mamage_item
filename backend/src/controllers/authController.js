const config = require("../utils/config");
const { generateToken } = require("../middleware/authMiddleware");

const predefinedUsername = config.api.username;
const predefinedPassword = config.api.password;

exports.loginUser = async (req, res) => {
     const { username, password } = req.body;
     if (username === predefinedUsername && password === predefinedPassword) {
          // Generate a JWT token with the payload containing username
          const payload = { username: predefinedUsername };
          const token = await generateToken(payload);
          return res.status(200).json({ success: true, status: "Login successful", token });
     }
     return res.status(401).json({ success: true, status: "Invalid username or password" });
};
