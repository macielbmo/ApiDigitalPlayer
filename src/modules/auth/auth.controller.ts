import { Controller, Request, Post, UseGuards, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string, password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  async register(@Body() body: { email: string, password: string }) {
    return this.authService.register(body.email, body.password, true);
  }

  @Get('validate-token')
  @UseGuards(JwtAuthGuard)
  async validateToken(@Request() req: any) {
    return { valid: true };
  }
}
