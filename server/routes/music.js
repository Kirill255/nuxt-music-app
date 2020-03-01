import express from "express";

import * as musicController from "../controllers/music";
import { upload } from "../config/multer";

const router = express.Router();

router.get("/", musicController.getAllMusics);
router.post("/", upload.single("music"), musicController.addNewMusic);
router.delete("/:musicId", musicController.deleteMusic);

export default router;
