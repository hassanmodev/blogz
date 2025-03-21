import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '@prisma/client';
import { PostDto } from './post.dto';

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Express {
  interface Request {
    user?: User;
  }
}

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) { }

  @Get()
  async getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createPost(@Req() req: Express.Request, @Body() body: PostDto) {
    return this.postService.createPost(body.title, body.content, req.user!.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updatePost(@Param('id') id: string, @Body() body: PostDto) {
    return this.postService.updatePost(id, body.title, body.content);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }
}
