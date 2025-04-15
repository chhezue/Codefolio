import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const projectMulterOptions = {
  storage: diskStorage({
    destination: './uploads', // 루트 기준 uploads 폴더에 저장
    filename: (req, file, cb) => {
      const uniqueSuffix = uuidv4();
      const ext = extname(file.originalname);
      cb(null, `${Date.now()}-${uniqueSuffix}${ext}`);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB 제한 (선택)
  },
};
