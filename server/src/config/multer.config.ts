import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuidv4 } from "uuid";
import { BadRequestException } from "@nestjs/common";

// 허용되는 이미지 파일 MIME 타입 목록
const ALLOWED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg"];

export const projectMulterOptions = {
  storage: diskStorage({
    destination: "./uploads", // 루트 기준 uploads 폴더에 저장
    filename: (req, file, cb) => {
      const uniqueSuffix = uuidv4();
      const ext = extname(file.originalname);
      cb(null, `${Date.now()}-${uniqueSuffix}${ext}`);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB 제한
  },
  fileFilter: (req, file, cb) => {
    // 파일 MIME 타입 검증
    if (ALLOWED_IMAGE_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true); // 허용
    } else {
      cb(
        new BadRequestException(
          `지원하지 않는 파일 형식입니다: ${file.mimetype}. 허용되는 형식: ${ALLOWED_IMAGE_MIME_TYPES.join(", ")}`
        ),
        false
      );
    }
  },
};
