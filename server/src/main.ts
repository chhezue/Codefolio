import 'tsconfig-paths/register'; // tsconfig의 paths 설정을 등록
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// 애플리케이션 진입점
async function bootstrap() {
    const logger = new Logger('Bootstrap');
    logger.log('🔧 애플리케이션을 초기화하는 중...');

    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    
    // CORS 설정
    app.enableCors();
    
    // 환경 정보 로깅
    const nodeEnv = configService.get('NODE_ENV', 'development');
    const PORT = configService.port;
    
    // Swagger 설정
    const config = new DocumentBuilder()
        .setTitle('Codefolio API')
        .setDescription('Codefolio API Document')
        .setVersion('1.0')
        .addTag('알고리즘', '알고리즘 포스트 관련 API')
        .addTag('프로젝트', '프로젝트 포스트 관련 API')
        .addTag('연락', '이메일 연락 관련 API')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'JWT',
                description: '인증 토큰을 입력하세요',
                in: 'header',
            },
            'access-token',
        )
        .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(PORT);
    
    logger.log(`🚀 서버가 시작되었습니다!`);
    logger.log(`🌐 URL: http://localhost:${PORT}`);
    logger.log(`📚 API 문서: http://localhost:${PORT}/api`);
    logger.log(`🔧 환경: ${nodeEnv}`);
    
    if (configService.isDevelopment) {
        logger.log('🛠️ 개발 모드로 실행 중입니다');
    } else if (configService.isProduction) {
        logger.log('🏭 프로덕션 모드로 실행 중입니다');
    }
}

bootstrap().catch(err => {
    const logger = new Logger('Bootstrap');
    logger.error(`❌ 애플리케이션 시작 중 오류가 발생했습니다: ${err.message}`);
    process.exit(1);
});
