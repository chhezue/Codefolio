import { Injectable } from "@nestjs/common";
import * as dotenv from "dotenv";
import * as path from "path";

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    dotenv.config({ path: path.resolve(process.cwd(), ".env") });
    this.envConfig = process.env;
  }

  get port(): number {
    return parseInt(this.get<string>("PORT", "3003"), 10);
  }

  get isDevelopment(): boolean {
    return this.get<string>("NODE_ENV", "development") === "development";
  }

  get isProduction(): boolean {
    return this.get<string>("NODE_ENV") === "production";
  }

  get<T>(key: string, defaultValue?: T): T {
    return (this.envConfig[key] as T) || defaultValue;
  }
}
