import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { generateRandomUser } from './auth.service.spec';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './auth.module';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  const randomUser = generateRandomUser();
  let token: string = '';

  beforeEach(async () => {
    const module: TestingModule = await Test
      .createTestingModule({
        providers: [AuthController, PrismaService, AuthService, JwtModule],
        imports: [JwtModule.register(jwtConfig)]
      })
      .compile();


    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a user', async () => {
    const result = await controller.register({ email: randomUser.email, password: randomUser.password, name: randomUser.name });
    expect(result.access_token).toBeDefined();
  });

  it('should login a user', async () => {
    const result = await controller.login({ email: randomUser.email, password: randomUser.password });
    token = result.access_token;
    expect(result.access_token).toBeDefined();
  });

  it('should not login a user with bad credentials',  () => {
    void expect(controller.login({ email: 'bademail', password: 'badpassword' })).rejects.toThrow();
  });
});
