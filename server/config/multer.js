import fs from "fs";
import multer from "multer";

const destPath = "./uploads";

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, destPath);
  },
  filename: (req, file, cb) => {
    // console.log(file);

    // const date = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // prettier-ignore 20200301_529497029_Zivert_-_Green_waves
    const date = new Date().toISOString().slice(0, 10); // prettier-ignore 2020-03-01_529497029_Zivert_-_Green_waves
    const uniqueSuffix = date + "_" + Math.round(Math.random() * 1e9) + "_";
    cb(null, uniqueSuffix + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  console.log(file.mimetype); // eslint-disable-line no-console

  if (!fs.existsSync(destPath)) fs.mkdirSync(destPath);

  if (
    file.mimetype === "audio/mpeg" ||
    file.mimetype === "audio/wave" ||
    file.mimetype === "audio/wav" ||
    file.mimetype === "audio/mp3"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10 // 10mb
  }
});
