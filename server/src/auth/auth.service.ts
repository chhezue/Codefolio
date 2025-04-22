import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "../config/config.service";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  // 입력된 비밀번호가 환경 변수와 같은지 확인
  validatePassword(password: string): boolean {
    return password === this.configService.get<string>("ADMIN_PASSWORD");
  }

  // accessToken 생성(유효기간 1일)
  generateToken(): string {
    return this.jwtService.sign({ isAdmin: true });
  }

  // 요청 때마다 토큰 검증
  verifyToken(token: string): boolean {
    try {
      const payload = this.jwtService.verify(token);
      return payload.isAdmin;
    } catch {
      return false;
    }
  }
}
