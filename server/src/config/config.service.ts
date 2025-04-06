import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    dotenv.config();
    this.envConfig = process.env;
  }

  get<T>(key: string, defaultValue?: T): T {
    return (this.envConfig[key] as T) || defaultValue;
  }

  get port(): number {
    return parseInt(this.get<string>('PORT', '3000'), 10);
  }

  get isDevelopment(): boolean {
    return this.get<string>('NODE_ENV', 'development') === 'development';
  }

  get isProduction(): boolean {
    return this.get<string>('NODE_ENV') === 'production';
  }
} 