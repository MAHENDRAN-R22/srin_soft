const express = require("express");
const authenticateJWT = require("../middleware/auth");
const rlogin = require('../controller/rlogin');
const rAdmin = require('../controller/rAdmin');
const rBook = require('../controller/rBook');

const router = express.Router();

// User Registration
router.post('/register', rlogin.register);
router.post('/login',rlogin.login);

//Admin Routes
router.post('/admin/books',authenticateJWT,rAdmin.createBooks);
router.put('/admin/books/:id',authenticateJWT,rAdmin.updateBooks);
router.delete('/admin/books/:id', authenticateJWT,rAdmin.deleteBooks);

//User Routes
router.get('/books',rBook.getBooks);
router.get('/books/author/:author_id',rBook.getBooksByAuthorId);
router.get('/books/:id',rBook.getBookById);

module.exports = router;