const multer = require('multer');
const DatauriPaser = require("datauri/parser");
const path = require('path');
const storage = multer.memoryStorage();

const multerUploads = multer({storage}).single('image');

const parser = new DatauriPaser();

/**
 * this converts buffer to data url
 * param obj, reqdcontaining field object
 * returns string, data url from string buffer
 */

const fileP = req => parser.format(path.extname(req.file.originalname).toString(),req.file.buffer);

module.exports = {multerUploads, fileP};
