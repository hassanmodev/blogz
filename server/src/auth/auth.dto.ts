import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}

export class RegisterDto extends LoginDto {
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name: string;
}

export class UserDto {
  id: string;
  name: string;
  email: string;
  constructor(
    user: UserDto
  ) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
}