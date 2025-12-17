import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
    @ApiProperty({
        description: '게시물 제목',
        example: '오늘의 일기',
        maxLength: 100
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        description: '게시물 내용',
        example: '오늘은 날씨가 좋았습니다...'
    })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({
        description: '썸네일 이미지 URL',
        example: '/uploads/abc123.jpg',
        required: false
    })
    @IsString()
    @IsOptional()
    thumbnail?: string;
}
