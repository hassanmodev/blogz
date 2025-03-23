import { Controller, Post, Body, Get, Req, UseGuards, UsePipes, ValidationPipe, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto, RegisterDto, UserDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    return this.authService.login(user);
  }

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto.email, registerDto.password, registerDto.name);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getAuthenticatedUser(@Req() request: Request): UserDto {
    const user = request.user as UserDto | undefined
    if (!user) throw new UnauthorizedException();
    return new UserDto(user);
  }
}
