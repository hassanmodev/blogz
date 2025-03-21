import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { PrismaModule } from '../prisma/prisma.module'; // Import PrismaModule
import { JwtStrategy } from './jwt.strategy';

export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'secret_key',
  signOptions: { expiresIn: '1h' },
} as const;
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register(jwtConfig),
    PrismaModule,
  ],
  providers: [AuthService, UserService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
