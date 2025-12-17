import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostResponseDto } from './dto/post-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) { }

    // 전체 게시물 목록 조회 (페이지네이션)
    async findAll(page: number = 1, limit: number = 5) {
        const skip = (page - 1) * limit;

        const [posts, totalCount] = await Promise.all([
            this.prisma.post.findMany({
                include: {
                    writer: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                    _count: {
                        select: { comments: true },
                    },
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.post.count(),
        ]);

        const totalPages = Math.ceil(totalCount / limit);

        return {
            items: plainToInstance(PostResponseDto, posts, {
                excludeExtraneousValues: true,
            }),
            totalCount,
            totalPages,
            currentPage: page,
        };
    }

    // 내 게시물 목록 조회 (페이지네이션)
    async findMyPosts(userId: number, page: number = 1, limit: number = 9) {
        const skip = (page - 1) * limit;

        const [posts, totalCount] = await Promise.all([
            this.prisma.post.findMany({
                where: { writerId: userId },
                include: {
                    writer: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                    _count: {
                        select: { comments: true },
                    },
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.post.count({
                where: { writerId: userId },
            }),
        ]);

        const totalPages = Math.ceil(totalCount / limit);

        return {
            items: plainToInstance(PostResponseDto, posts, {
                excludeExtraneousValues: true,
            }),
            totalCount,
            totalPages,
            currentPage: page,
        };
    }

    // 단일 게시물 조회 (조회수 증가 없음)
    async findOne(id: number): Promise<PostResponseDto> {
        // 게시물 조회
        const post = await this.prisma.post.findUnique({
            where: { id },
            include: {
                writer: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                _count: {
                    select: { comments: true },
                },
            },
        });

        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }

        return plainToInstance(PostResponseDto, post, {
            excludeExtraneousValues: true,
        });
    }

    // 조회수 증가 (별도 API)
    async incrementViews(id: number): Promise<void> {
        const post = await this.prisma.post.findUnique({ where: { id } });
        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }

        await this.prisma.post.update({
            where: { id },
            data: { views: { increment: 1 } },
        });
    }

    // 게시물 생성
    async create(userId: number, createPostDto: CreatePostDto): Promise<PostResponseDto> {
        const post = await this.prisma.post.create({
            data: {
                ...createPostDto,
                writerId: userId,
            },
        });
        return plainToInstance(PostResponseDto, post, {
            excludeExtraneousValues: true,
        });
    }

    // 게시물 수정
    async update(id: number, userId: number, updatePostDto: UpdatePostDto): Promise<PostResponseDto> {
        // 게시물 존재 확인
        const existingPost = await this.prisma.post.findUnique({ where: { id } });
        if (!existingPost) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }

        // 본인 게시물 확인
        if (existingPost.writerId !== userId) {
            throw new ForbiddenException('You are not allowed to update this post');
        }

        const updated = await this.prisma.post.update({
            where: { id },
            data: updatePostDto,
        });

        return plainToInstance(PostResponseDto, updated, {
            excludeExtraneousValues: true,
        });
    }

    // 게시물 삭제
    async remove(id: number, userId: number): Promise<PostResponseDto> {
        // 게시물 존재 확인
        const existingPost = await this.prisma.post.findUnique({ where: { id } });
        if (!existingPost) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }

        // 본인 게시물 확인
        if (existingPost.writerId !== userId) {
            throw new ForbiddenException('You are not allowed to delete this post');
        }

        const deletedPost = await this.prisma.post.delete({
            where: { id },
        });
        return plainToInstance(PostResponseDto, deletedPost, {
            excludeExtraneousValues: true,
        });
    }
}
