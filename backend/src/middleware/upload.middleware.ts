import { randomUUID } from "crypto";
import path from "path";
import multer from "multer";
import { HttpError } from "../shared/http-error";

const UPLOAD_DIR = path.join(process.cwd(), "uploads", "models");

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${randomUUID()}${ext}`);
  },
});

const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export const uploadModelImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(new HttpError(400, "Faqat rasm fayllari ruxsat etiladi (jpg, png, webp, gif)"));
      return;
    }
    cb(null, true);
  },
}).single("image");
