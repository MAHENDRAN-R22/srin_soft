
//to handle the known and defined errors
exports.sendResponse = (res, status, data = [], message = "") => {
    res.status(status).json({ message, data });
};