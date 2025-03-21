import { IsString, MinLength } from 'class-validator';

export class PostDto {
  @IsString()
  @MinLength(10, { message: 'Title must be at least 10 characters long' })
  title: string;

  @IsString()
  @MinLength(60, { message: 'Content must be at least 60 characters long' })
  content: string;
}
