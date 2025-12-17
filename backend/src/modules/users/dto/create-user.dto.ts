import { IsEmail, IsString, MinLength, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    name?: string;
}
