const path = require("path");
const fs = require("fs-extra");
const uuid = require("uuid");

const uploadPath = path.join(__dirname, "../../uploads/");
fs.ensureDir(uploadPath);

exports.uploadFile = async (req, res, next) => {
  req.pipe(req.busboy);
  let filePath;
  req.busboy.on("file", (fieldname, file, info) => {
    filePath = path.join(
      uploadPath,
      uuid.v1() + "." + String(info.filename).split(".")[1]
    );
    console.log(`Uploading ${info.filename}`);
    const fstream = fs.createWriteStream(filePath);
    file.pipe(fstream);
  });
  req.busboy.on("field", (key, value) => {
    req.body[key] = value;
  });
  req.busboy.on('finish', () => {
    req.body['path'] = filePath;
    next();
  });
};
