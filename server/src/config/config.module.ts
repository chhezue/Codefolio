import { Module, Logger } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';
import * as Joi from 'joi';
import * as path from 'path';
import * as fs from 'fs';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(process.cwd(), '.env'),
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
        GITHUB_TOKEN: Joi.string().default('default_token'),
        PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string().default('development'),
      }),
      ignoreEnvFile: false,
      load: [
        () => {
          const logger = new Logger('ConfigModule');
          const envPath = path.resolve(process.cwd(), '.env');
          
          if (fs.existsSync(envPath)) {
            logger.log(`✅ .env 파일을 찾았습니다: ${envPath}`);
            try {
              const content = fs.readFileSync(envPath, 'utf8');
              logger.log(`✅ .env 파일 내용 확인 (첫 줄): ${content.split('\n')[0]}`);
            } catch (error) {
              logger.error(`❌ .env 파일 읽기 실패: ${error.message}`);
            }
          } else {
            logger.error(`❌ .env 파일을 찾을 수 없습니다: ${envPath}`);
          }
          
          return {};
        },
      ],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
