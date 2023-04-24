const path = require("path");
const fs = require("fs-extra");
const uuid = require("uuid");

const uploadPath = path.join(__dirname, "../../storage/podcasts/");
const thumbnailPath = path.join(__dirname, "../../storage/thumbnails/");

fs.ensureDir(uploadPath);
fs.ensureDir(thumbnailPath);

const getFileExt = (filename) => {
  let splitName = String(filename).split(".");
  return splitName[splitName.length - 1];
};

exports.uploadFile = async (req, res, next) => {
  req.pipe(req.busboy);
  let fileUrl;
  let thumbnailUrl;
  req.busboy.on("file", (fieldname, file, info) => {
    console.log(`Uploading ${info.filename}`);
    let randomFileName = uuid.v1() + "." + getFileExt(info.filename);
    let filePath;
    if (fieldname === "thumbnail") {
      filePath = path.join(thumbnailPath, randomFileName);
      thumbnailUrl = "/thumbnails/" + randomFileName;
    } else if (fieldname === "podcast") {
      filePath = path.join(uploadPath, randomFileName);
      fileUrl = "/podcasts/" + randomFileName;
    }
    let fstream = fs.createWriteStream(filePath);
    file.pipe(fstream);
  });
  req.busboy.on("field", (key, value) => {
    req.body[key] = value;
  });
  req.busboy.on("finish", () => {
    req.body["podcast"] = fileUrl;
    req.body["thumbnail"] = thumbnailUrl;
    next();
  });
};
