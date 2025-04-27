import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import { join } from "path";
import * as dotenv from "dotenv";
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  ValidationPipe,
} from "@nestjs/common";
import { Request, Response } from "express";

// 글로벌 예외 필터
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // 오류 로깅을 상세하게
    console.error("=== 글로벌 예외 발생 ===");
    console.error(`${request.method} ${request.url}`);

    if (exception instanceof HttpException) {
      console.error(`HttpException: ${exception.message}`);
      console.error("Response body:", exception.getResponse());
      console.error("Stack:", exception.stack);

      const status = exception.getStatus();
      response.status(status).json({
        statusCode: status,
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else if (exception instanceof Error) {
      console.error(`Error: ${exception.message}`);
      console.error("Stack:", exception.stack);

      // TypeORM이나 다른 데이터베이스 오류 처리
      if (
        exception.name?.includes("TypeORM") ||
        exception.name?.includes("QueryFailedError")
      ) {
        console.error("데이터베이스 오류:", exception);
      }

      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `서버 내부 오류: ${exception.message}`,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else {
      console.error("Unknown error:", exception);

      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "알 수 없는 서버 오류가 발생했습니다",
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
}

// 애플리케이션 진입점
async function bootstrap() {
  // 환경변수 로드
  dotenv.config();
  const PORT = process.env.PORT || 3003;

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  // 글로벌 파이프 설정 (DTO 검증)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 없는 속성 제거
      transform: true, // 요청 데이터를 DTO 인스턴스로 변환
    })
  );

  // CORS 설정 수정
  app.enableCors({
    origin: configService.get("CLIENT_URL") || "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  // uploads 폴더 정적으로 제공 (원래 코드 유지)
  app.useStaticAssets(join(__dirname, "..", "uploads"), {
    prefix: "/uploads/",
  });

  // 글로벌 예외 필터 등록
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(PORT);
  console.log(`Application is running on http://localhost:${PORT}`);
}

bootstrap();
