const config = require("config");
const { Sequelize } = require("sequelize");
const username = config.get("db.username");
const password = config.get("db.password");
const name = config.get("db.name");
const port = config.get("db.port");
const sequelize = new Sequelize({
     dialect: "postgres",
     host: "localhost",
     port: port,
     username: username,
     password: password,
     database: name,
     logging: true,
});

const connectDB = async () => {
     try {
          await sequelize.authenticate();
          console.log("Connection has been established successfully.");
          sequelize
               .sync({ force: false }) // Use { force: true } in development to drop existing tables
               .then(() => {
                    console.log("Database synchronized");
               })
               .catch((error) => {
                    console.error("Error syncing database:", error);
               });
     } catch (error) {
          console.error("Unable to connect to the database:", error);
     }
};

// relationship

module.exports = { sequelize, connectDB };
