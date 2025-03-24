import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) { }

  async createPost(title: string, content: string, authorId: string) {
    return this.prisma.post.create({
      data: { title, content, authorId },
    });
  }

  async getAllPosts() {
    return this.prisma.post.findMany({ include: { author: true } });
  }

  async getPostById(id: string) {
    return this.prisma.post.findUnique({ where: { id }, include: { author: true, Comment: true } });
  }

  async updatePost(id: string, title: string, content: string) {
    return this.prisma.post.update({
      where: { id },
      data: { title, content },
    });
  }

  async deletePost(id: string) {
    try {
      return await this.prisma.post.delete({ where: { id } })
    } catch (error) {
      const e = error as PrismaClientKnownRequestError
      if (e.code === 'P2025') {
        throw new NotFoundException('Post not found')
      }
      throw error
    }
  }

  async createComment(postId: string, content: string, commenter: string) {
    return this.prisma.comment.create({
      data: {
        content,
        postId,
        commenter,
      },
    });
  }
}
