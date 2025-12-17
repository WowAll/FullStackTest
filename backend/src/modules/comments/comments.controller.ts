import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Comments')
@Controller()
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }

    // 공개 API - 인증 불필요
    @Get('posts/:postId/comments')
    @ApiOperation({ summary: '댓글 목록 조회', description: '특정 게시물의 댓글 목록을 조회합니다. (공개)' })
    @ApiParam({ name: 'postId', description: '게시물 ID', example: 1 })
    @ApiResponse({ status: 200, description: '댓글 목록 반환' })
    findByPost(@Param('postId', ParseIntPipe) postId: number) {
        return this.commentsService.findByPost(postId);
    }

    // 인증 필요 API
    @Post('posts/:postId/comments')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: '댓글 작성', description: '특정 게시물에 댓글을 작성합니다.' })
    @ApiParam({ name: 'postId', description: '게시물 ID', example: 1 })
    @ApiResponse({ status: 201, description: '댓글 생성 성공' })
    @ApiResponse({ status: 400, description: '잘못된 입력 데이터' })
    @ApiResponse({ status: 401, description: '인증 필요' })
    create(@Param('postId', ParseIntPipe) postId: number, @Request() req, @Body() createCommentDto: CreateCommentDto) {
        return this.commentsService.create(postId, req.user.userId, createCommentDto);
    }

    @Patch('comments/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: '댓글 수정', description: '본인의 댓글을 수정합니다.' })
    @ApiParam({ name: 'id', description: '댓글 ID', example: 1 })
    @ApiResponse({ status: 200, description: '댓글 수정 성공' })
    @ApiResponse({ status: 401, description: '인증 필요' })
    @ApiResponse({ status: 403, description: '수정 권한 없음' })
    update(@Param('id', ParseIntPipe) id: number, @Request() req, @Body() updateCommentDto: UpdateCommentDto) {
        return this.commentsService.update(id, req.user.userId, updateCommentDto);
    }

    @Delete('comments/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: '댓글 삭제', description: '본인의 댓글을 삭제합니다.' })
    @ApiParam({ name: 'id', description: '댓글 ID', example: 1 })
    @ApiResponse({ status: 200, description: '댓글 삭제 성공' })
    @ApiResponse({ status: 401, description: '인증 필요' })
    @ApiResponse({ status: 403, description: '삭제 권한 없음' })
    remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
        return this.commentsService.remove(id, req.user.userId);
    }
}
