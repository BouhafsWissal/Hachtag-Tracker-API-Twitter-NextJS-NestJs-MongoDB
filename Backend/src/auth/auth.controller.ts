/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('motdepasse') motdepasse: string,
  ): Promise<{ token: string }> {
    const token = await this.authService.login(email, motdepasse);
    return { token };
  }
}
