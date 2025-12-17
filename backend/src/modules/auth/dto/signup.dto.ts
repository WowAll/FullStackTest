import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
    @ApiProperty({
        description: '사용자 이메일 주소',
        example: 'user@example.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: '비밀번호 (최소 6자)',
        example: 'password123',
        minLength: 6
    })
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        description: '사용자 이름',
        example: '홍길동'
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}
