import { IsString, MaxLength, MinLength } from 'class-validator';

export class PostDto {
  @IsString()
  @MinLength(10, { message: 'Title must be at least 10 characters long' })
  @MaxLength(50, { message: 'Title must be at most 50 characters long' })
  title: string;

  @IsString()
  @MinLength(50, { message: 'Content must be at least 60 characters long' })
  @MaxLength(500, { message: 'Content must be at most 500 characters long' })
  content: string;
}
