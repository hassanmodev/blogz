import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module'; // Import PrismaModule
import { JwtStrategy } from './jwt.strategy';

export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'secret_key',
  signOptions: { expiresIn: '1h' },
} as const;
@Module({
  imports: [
    PassportModule,
    JwtModule.register(jwtConfig),
    PrismaModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
