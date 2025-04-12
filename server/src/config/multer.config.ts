import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

// 업로드 경로 생성 함수
export const createUploadDirectories = () => {
  const uploadDir = './uploads';
  const projectDir = `${uploadDir}/projects`;
  const featuresDir = `${projectDir}/features`;
  const screenshotsDir = `${projectDir}/screenshots`;

  // 디렉토리가 없으면 생성
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir);
  }
  if (!fs.existsSync(featuresDir)) {
    fs.mkdirSync(featuresDir);
  }
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }
};

// 프로젝트 이미지 업로드 설정
export const projectMulterOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      let uploadPath = './uploads/projects';
      
      // fieldname에 따라 저장 경로 다르게 지정
      if (file.fieldname.includes('features')) {
        uploadPath = './uploads/projects/features';
      } else if (file.fieldname.includes('screenshots')) {
        uploadPath = './uploads/projects/screenshots';
      }
      
      // 디렉토리 생성
      createUploadDirectories();
      
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      // 파일명: 현재 시간 + 랜덤 문자열 + 확장자
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      cb(null, `${uniqueSuffix}${ext}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    // 이미지 파일만 허용
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('지원되지 않는 이미지 형식입니다.'), false);
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB 제한
  },
};

// Express Multer 인터페이스 (TypeScript 타입 정의)
export interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
} 