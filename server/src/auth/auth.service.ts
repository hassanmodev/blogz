import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) { }




  async createUser(email: string, password: string, name: string) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          salt,
          name,
        },
      });

      return this.login({ email, id: user.id, name });
    }
    catch (error: any) {
      if ((error as Prisma.PrismaClientKnownRequestError).code === 'P2002')
        throw new ConflictException('The email is already in use');
      throw new Error('An error occurred while creating the user');
    }
  }

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }


  async validateUser(email: string, password: string) {
    const user = await this.findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  login(user: { email: string, id: string, name: string }): { access_token: string } {
    const payload = { email: user.email, sub: user.id, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(email: string, password: string, name: string) {
    return this.createUser(email, password, name);
  }
}
