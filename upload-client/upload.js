const fs = require('fs');
const { exit } = require('process');
const request = require('request');
const path = require("path");
const url = "http://localhost:3000/multiple-upload";
var time_stampfile = Date.now();
const directoryPath = __dirname + "\\files";
fs.readdir(directoryPath, function (err, files) {
  //handling error
  if (err) {
      return console.log('Unable to scan directory: ' + err);
  } 
  //listing all files using forEach
  files.forEach(function (f) {
    // Do whatever you want to do with the file
    
    var options = {
        directory_name: time_stampfile.toString(),
        multi_file: fs.createReadStream(directoryPath + "\\" + f)
    }
    
    request.post({url: url, formData: options});
  });  
});