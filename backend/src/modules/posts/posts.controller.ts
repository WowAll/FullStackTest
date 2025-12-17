import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseIntPipe, UseInterceptors, UploadedFile, BadRequestException, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiConsumes, ApiBody, ApiQuery } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { multerConfig } from '../../config/multer.config';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    // 공개 API - 인증 불필요
    @Get()
    @ApiOperation({ summary: '전체 게시물 목록', description: '모든 게시물을 페이지네이션으로 조회합니다. (공개)' })
    @ApiQuery({ name: 'page', required: false, description: '페이지 번호 (기본값: 1)', example: 1 })
    @ApiQuery({ name: 'limit', required: false, description: '페이지당 게시물 수 (기본값: 9)', example: 9 })
    @ApiResponse({ status: 200, description: '게시물 목록 반환' })
    findAll(
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        const pageNum = parseInt(page || '1', 10);
        const limitNum = parseInt(limit || '9', 10);
        return this.postsService.findAll(pageNum, limitNum);
    }

    // 중요: 'me'는 ':id'보다 먼저 정의해야 함 (라우트 매칭 우선순위)
    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: '내 게시물 목록', description: '로그인한 사용자의 게시물만 조회합니다.' })
    @ApiQuery({ name: 'page', required: false, description: '페이지 번호 (기본값: 1)', example: 1 })
    @ApiQuery({ name: 'limit', required: false, description: '페이지당 게시물 수 (기본값: 9)', example: 9 })
    @ApiResponse({ status: 200, description: '내 게시물 목록 반환' })
    @ApiResponse({ status: 401, description: '인증 필요' })
    findMyPosts(
        @Request() req,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        const pageNum = parseInt(page || '1', 10);
        const limitNum = parseInt(limit || '9', 10);
        return this.postsService.findMyPosts(req.user.userId, pageNum, limitNum);
    }

    // 공개 API - 인증 불필요
    @Get(':id')
    @ApiOperation({ summary: '게시물 상세 조회', description: '특정 게시물을 조회합니다. (공개)' })
    @ApiParam({ name: 'id', description: '게시물 ID', example: 1 })
    @ApiResponse({ status: 200, description: '게시물 상세 정보 반환' })
    @ApiResponse({ status: 404, description: '게시물을 찾을 수 없음' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.findOne(id);
    }

    // 조회수 증가 (클라이언트에서 호출) - 공개 API
    @Post(':id/views')
    @ApiOperation({ summary: '조회수 증가', description: '게시물 조회수를 1 증가시킵니다. (공개)' })
    @ApiParam({ name: 'id', description: '게시물 ID', example: 1 })
    @ApiResponse({ status: 200, description: '조회수 증가 성공' })
    @ApiResponse({ status: 404, description: '게시물을 찾을 수 없음' })
    incrementViews(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.incrementViews(id);
    }

    // 이미지 업로드 엔드포인트
    @Post('upload')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @UseInterceptors(FileInterceptor('file', multerConfig))
    @ApiOperation({ summary: '이미지 업로드', description: '게시물 썸네일 이미지를 업로드합니다.' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: { type: 'string', format: 'binary' },
            },
        },
    })
    @ApiResponse({ status: 201, description: '업로드 성공' })
    @ApiResponse({ status: 400, description: '잘못된 파일' })
    @ApiResponse({ status: 401, description: '인증 필요' })
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('File is required');
        }
        return { url: `/uploads/${file.filename}` };
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: '게시물 생성', description: '새로운 게시물을 작성합니다.' })
    @ApiResponse({ status: 201, description: '게시물 생성 성공' })
    @ApiResponse({ status: 400, description: '잘못된 입력 데이터' })
    @ApiResponse({ status: 401, description: '인증 필요' })
    create(@Request() req, @Body() createPostDto: CreatePostDto) {
        return this.postsService.create(req.user.userId, createPostDto);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: '게시물 수정', description: '본인의 게시물을 수정합니다.' })
    @ApiParam({ name: 'id', description: '게시물 ID', example: 1 })
    @ApiResponse({ status: 200, description: '게시물 수정 성공' })
    @ApiResponse({ status: 401, description: '인증 필요' })
    @ApiResponse({ status: 403, description: '수정 권한 없음' })
    @ApiResponse({ status: 404, description: '게시물을 찾을 수 없음' })
    update(@Request() req, @Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto) {
        return this.postsService.update(id, req.user.userId, updatePostDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: '게시물 삭제', description: '본인의 게시물을 삭제합니다.' })
    @ApiParam({ name: 'id', description: '게시물 ID', example: 1 })
    @ApiResponse({ status: 200, description: '게시물 삭제 성공' })
    @ApiResponse({ status: 401, description: '인증 필요' })
    @ApiResponse({ status: 403, description: '삭제 권한 없음' })
    @ApiResponse({ status: 404, description: '게시물을 찾을 수 없음' })
    remove(@Request() req, @Param('id', ParseIntPipe) id: number) {
        return this.postsService.remove(id, req.user.userId);
    }
}
