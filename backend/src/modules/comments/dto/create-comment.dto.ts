import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
    @ApiProperty({
        description: '댓글 내용',
        example: '좋은 글이네요!'
    })
    @IsString()
    @IsNotEmpty()
    content: string;
}
