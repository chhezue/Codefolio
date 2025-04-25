import { Controller, Post, UnauthorizedException, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  login(@Body() body: { password: string }) {
    if (this.authService.validatePassword(body.password)) {
      const token = this.authService.generateToken();
      return { token };
    }
    throw new UnauthorizedException();
  }
}
