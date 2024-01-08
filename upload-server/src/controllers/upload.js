const upload = require("../middleware/upload");

const multipleUpload = async (req, res) => {
  try {
    await upload(req, res);
    // console.log(req.body);
    res.send("OK")
  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload.");
    }
    return res.send(`Error when trying upload many files: ${error}`);
  }
};

module.exports = {
  multipleUpload: multipleUpload
};