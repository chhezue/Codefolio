import 'tsconfig-paths/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@config/config.service';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

// 애플리케이션 진입점
async function bootstrap() {
    const logger = new Logger('Bootstrap');
    logger.log('🔧 애플리케이션을 초기화하는 중...');

    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService = app.get(ConfigService);
    
    // CORS 설정
    app.enableCors();
    
    // 환경 정보 로깅
    const nodeEnv = configService.get('NODE_ENV', 'development');
    const PORT = configService.port;

    // uploads 폴더 정적으로 제공
    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
        prefix: '/uploads/',
    });

    await app.listen(PORT);
    
    logger.log(`🚀 서버가 시작되었습니다!`);
    logger.log(`🌐 URL: http://localhost:${PORT}`);
    logger.log(`🔧 환경: ${nodeEnv}`);
    
    if (configService.isDevelopment) {
        logger.log('🛠️ 개발 모드로 실행 중입니다.');
    } else if (configService.isProduction) {
        logger.log('🏭 프로덕션 모드로 실행 중입니다.');
    }
}

bootstrap().catch(err => {
    const logger = new Logger('Bootstrap');
    logger.error(`❌ 애플리케이션 시작 중 오류가 발생했습니다: ${err.message}`);
    process.exit(1);
});
