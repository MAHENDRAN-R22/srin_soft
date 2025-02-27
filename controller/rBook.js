const pool = require('../config/db.js');
const {sendResponse} = require('../utils/response.js');

//function to get all books 
exports.getBooks = async(req,res,next)=>{
    try {
        const result = await pool.query('SELECT * FROM books WHERE active = true');
        if (result?.rows?.length === 0) {
          return sendResponse(res,200,{},"NO_REC");
        }
        sendResponse(res,200,result?.rows,"FOUND");
      } catch (error) {
         next(error);
      }
}

//function to get the books by author Id
exports.getBooksByAuthorId = async(req,res,next)=>{
    try {
        const result = await pool.query('SELECT * FROM books WHERE active = true');
        if (result?.rows?.length === 0) {
          return sendResponse(res,200,{},"NO_REC");
        }
        sendResponse(res,200,result?.rows,"FOUND");
      } catch (error) {
         next(error);
      }
}

//function to get the books by Id
exports.getBookById = async(req,res,next)=>{
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM books WHERE id = $1 AND active = true', [id]);
        if (result?.rows?.length === 0) {
          return sendResponse(res,200,{},"NO_REC");
        }
        sendResponse(res,200,result?.rows[0],"FOUND");
      } catch (error) {
         next(error);
      }
}