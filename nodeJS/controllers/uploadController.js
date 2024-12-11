const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const storage = new GridFsStorage({
  url: DB,
  file: (req, file) => {
    console.log(req);
    console.log(file);
    return {
      bucketName: "photos",
      filename: `${Date.now()}_${file.originalname}`,
    };
  },
});

const upload = multer({ storage });

exports.uploadPhoto = upload.single("photo");
