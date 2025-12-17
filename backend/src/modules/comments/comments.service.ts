import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentResponseDto } from './dto/comment-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CommentsService {
    constructor(private prisma: PrismaService) { }

    // 게시물의 댓글 목록
    async findByPost(postId: number): Promise<CommentResponseDto[]> {
        const comments = await this.prisma.comment.findMany({
            where: { postId },
            include: {
                writer: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        return plainToInstance(CommentResponseDto, comments, {
            excludeExtraneousValues: true,
        });
    }

    // 댓글 작성
    async create(postId: number, userId: number, createCommentDto: CreateCommentDto): Promise<CommentResponseDto> {
        // 게시물 존재 확인
        const post = await this.prisma.post.findUnique({ where: { id: postId } });
        if (!post) {
            throw new NotFoundException(`Post with ID ${postId} not found`);
        }

        const comment = await this.prisma.comment.create({
            data: {
                ...createCommentDto,
                postId,
                writerId: userId,
            },
            include: {
                writer: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return plainToInstance(CommentResponseDto, comment, {
            excludeExtraneousValues: true,
        });
    }

    // 댓글 수정
    async update(id: number, userId: number, updateCommentDto: UpdateCommentDto): Promise<CommentResponseDto> {
        const comment = await this.prisma.comment.findUnique({ where: { id } });

        if (!comment) {
            throw new NotFoundException('Comment not found');
        }

        if (comment.writerId !== userId) {
            throw new ForbiddenException('You can only edit your own comments');
        }

        const updated = await this.prisma.comment.update({
            where: { id },
            data: updateCommentDto,
            include: {
                writer: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return plainToInstance(CommentResponseDto, updated, {
            excludeExtraneousValues: true,
        });
    }

    // 댓글 삭제
    async remove(id: number, userId: number): Promise<CommentResponseDto> {
        const comment = await this.prisma.comment.findUnique({
            where: { id },
            include: {
                writer: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        if (!comment) {
            throw new NotFoundException('Comment not found');
        }

        if (comment.writerId !== userId) {
            throw new ForbiddenException('You can only delete your own comments');
        }

        const deleted = await this.prisma.comment.delete({
            where: { id },
            include: {
                writer: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return plainToInstance(CommentResponseDto, deleted, {
            excludeExtraneousValues: true,
        });
    }
}
