// config/db.js
const { Sequelize } = require("sequelize");

// Create a new Sequelize instance
const sequelize = new Sequelize("logistick", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Disable logging
});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Import models after the database connection is established
    const Contact = require("../models/contact");

    // Sync models after importing
    await Contact;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

module.exports = sequelize;