const pool = require('../config/db.js');

// create book table
exports.createBookTable = async () => {
  const queryText = `
  CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  author_id INTEGER  NOT NULL,
  image VARCHAR(255),
  genres VARCHAR(255)[],
  price DECIMAL(10, 2),
  active BOOLEAN DEFAULT TRUE
)
    `;

  try {
    pool.query(queryText);
    console.log("User table created if not exists");
  } catch (error) {
    console.log("Error creating userstable", error);
  }
};