const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const storage = new GridFsStorage({
  url: DB,
  file: (_, file) => {
    return {
      bucketName: "photos",
      filename: `${Date.now()}-file-${file.originalname}`,
    };
  },
});

const upload = multer({ storage });

exports.uploadMulterPhoto = upload.single("file");
