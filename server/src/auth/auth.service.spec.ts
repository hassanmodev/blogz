import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './auth.module';

export const generateRandomUser = () => {
  const r = Math.random().toString(36).substring(7);
  return { email: `${r}@test.com`, password: r, name: r };
}
describe('AuthService', () => {
  let authService: AuthService;
  const randomUser = generateRandomUser()
  global.randomUser = randomUser

  beforeEach(async () => {
    const module: TestingModule = await Test
      .createTestingModule({
        providers: [AuthService, PrismaService],
        imports: [JwtModule.register(jwtConfig)]

      })
      .compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should register a user and return an access token', async () => {
    const { email, password, name } = randomUser
    const result = await authService.register(email, password, name)
    expect(result).toHaveProperty('access_token')
  });

});
