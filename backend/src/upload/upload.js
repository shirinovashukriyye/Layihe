import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); 
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); 
    const baseName = path.basename(file.originalname, ext);
    const uniqueName = baseName + "-" + Date.now() + ext;
    cb(null, uniqueName);
  },
});

const fileFilter = function (req, file, cb) {
 const allowedTypes = [".jpeg", ".jpg", ".png", ".gif"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Yalnız şəkil fayllarına icazə verilir (.jpeg, .jpg, .png, .gif)"));
  }
};
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter,
});

export default upload;
