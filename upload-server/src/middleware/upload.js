const util = require("util");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    
    fs.mkdir(path.resolve(`${__dirname}/../../upload/`, req.body.directory_name), { recursive: true }, e => {
      if (e) {
          console.error(e);
      } else {
        console.log("success");
      }
    });
    callback(null, path.join(`${__dirname}/../../upload/${req.body.directory_name}`));
  },
  filename: (req, file, callback) => {
    var random_file_number = Math.floor((Math.random() * 1000000) + 1);
    var filename = `${random_file_number}-${file.originalname}`;
    // console.log(filename);
    callback(null, path.join(filename));
  }
});

var uploadFiles = multer({ storage: storage }).array("multi_file", 100);
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;