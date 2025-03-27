import { Injectable, Logger } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);
  
  constructor(private configService: NestConfigService) {
    this.logger.log('ConfigService 초기화됨');
  }

  get mongoUri(): string {
    const uri = this.configService.get<string>('MONGO_URI');
    if (!uri) {
      this.logger.error('❌ MONGO_URI 환경변수를 찾을 수 없습니다!');
      throw new Error('❌ MONGO_URI is not defined');
    }
    this.logger.log('✅ MONGO_URI를 성공적으로 로드했습니다');
    return uri;
  }

  get githubToken(): string {
    const token = this.configService.get<string>('GITHUB_TOKEN');
    if (!token) {
      this.logger.error('❌ GITHUB_TOKEN 환경변수를 찾을 수 없습니다!');
      throw new Error('❌ GITHUB_TOKEN is not defined');
    }
    this.logger.log('✅ GITHUB_TOKEN을 성공적으로 로드했습니다');
    return token;
  }

  get port(): number {
    const port = this.configService.get<number>('PORT') || 3000;
    this.logger.log(`✅ PORT를 성공적으로 로드했습니다: ${port}`);
    return port;
  }

  get isDevelopment(): boolean {
    const env = this.configService.get('NODE_ENV');
    this.logger.log(`✅ 현재 환경: ${env}`);
    return env === 'development';
  }

  get isProduction(): boolean {
    return this.configService.get('NODE_ENV') === 'production';
  }

  get<T>(key: string, defaultValue?: T): T {
    const value = this.configService.get<T>(key);
    if (value === undefined && defaultValue === undefined) {
      this.logger.warn(`⚠️ 환경변수 "${key}"를 찾을 수 없고 기본값이 제공되지 않았습니다`);
      throw new Error(`Configuration key "${key}" is not defined and no default value was provided`);
    }
    return (value !== undefined ? value : defaultValue) as T;
  }
}
