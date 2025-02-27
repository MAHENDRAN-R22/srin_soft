const { createBookTable } = require('../data/createBookTable.js');
const pool = require('../config/db.js');
const {sendResponse} = require('../utils/response.js');

//when the routing to create the table if exists it will not create 
createBookTable();

//function to create books
exports.createBooks = async(req, res,next)=> {
    if (!req?.user?.isAdmin) {
        return next({ name: "ForbiddenError" });
      }
      try {
          const { name, author_id, image, genres, price, active } = req.body;
          const result = await pool.query(
            'INSERT INTO books (name, author_id, image, genres, price, active) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, author_id, image, genres, price, active]
          );
          sendResponse(res,200,result?.rows[0],"created");
      } catch (error) {
          next(error);
      }
    
}

//function to update books
exports.updateBooks = async (req, res, next) => {
    if (!req?.user?.isAdmin) {
        return next({ name: "ForbiddenError" });
    }
    try {
        const { name, author_id, image, genres, price, active } = req.body;
        const { id } = req.params;
        const result = await pool.query(
            'UPDATE books SET name = $1, author_id = $2, image = $3, genres = $4, price = $5, active = $6 WHERE id = $7 RETURNING *',
            [name, author_id, image, genres, price, active, id]
        );

        if (result.rows.length === 0) {
            sendResponse(res,404,{},"Book not found");
        }
        sendResponse(res,200,result.rows[0],"Updated successfully");
    } catch (error) {
        console.log("createerrrorr")
        console.log(error)
        next(error);
    }
};

//function to delete books
exports.deleteBooks = async (req, res, next) => {
    if (!req?.user?.isAdmin) {
        return next({ name: "ForbiddenError" });
    }
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);

        if (result?.rowCount === 0) {
            sendResponse(res,404,{},"Book not found");
        }
        sendResponse(res,200,{},"Deleted successfully");
    } catch (error) {
        next(error);
    }
};
