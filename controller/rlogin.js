const bcrypt = require('bcrypt');
const { createUserTable } = require('../data/createUserTable.js');
const pool = require('../config/db.js');
const jwt = require('jsonwebtoken');
const {sendResponse} = require('../utils/response.js');
require("dotenv").config();

//when the routing to create the table if exists it will not create 
createUserTable();

// function to get register users
exports.register = async(req, res,next)=> {
    try {
        if (!req.body?.username || !req.body?.password) {
          return sendResponse(res, 400, {}, "Username or password are required");
        }
        const { username, password, isAdmin } = req.body;   
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const result = await pool.query(
          'INSERT INTO users (username, password, is_admin) VALUES ($1, $2, $3) RETURNING *',
          [username, hashedPassword, isAdmin]
        );
        sendResponse(res, 201,{}, "Created");
      } catch (error) {
        next(error);
      }
    
}

// function to get login users
exports.login = async(req, res,next)=> {
    try {
      if (!req.body?.username || !req.body?.password) {
        return sendResponse(res, 200, {}, "Username and password are required");
      }
      const { username, password } = req.body;
      const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      const user = result.rows[0];
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return next({ name: "INVALID_CREDENTIALS" });
      }
  
      const token = jwt.sign({ userId: user.id, isAdmin: user.is_admin }, process.env.JWT_SECRET);
      sendResponse(res, 200, { token }, "Login successful");
    } catch (error) {
        next(error);
    }
    
}