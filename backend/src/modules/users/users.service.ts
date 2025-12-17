import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    // 전체 유저 조회
    async findAll(): Promise<UserResponseDto[]> {
        const users = await this.prisma.user.findMany();
        return plainToInstance(UserResponseDto, users, {
            excludeExtraneousValues: true,
        });
    }

    // ID로 유저 조회
    async findOne(id: number): Promise<UserResponseDto> {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return plainToInstance(UserResponseDto, user, {
            excludeExtraneousValues: true,
        });
    }

    // 유저 생성
    async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
        const { password, ...rest } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.prisma.user.create({
            data: {
                ...rest,
                password: hashedPassword,
            },
        });
        return plainToInstance(UserResponseDto, user, {
            excludeExtraneousValues: true,
        });
    }

    // 유저 수정
    async update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
        // 존재 확인
        const existing = await this.prisma.user.findUnique({ where: { id } });
        if (!existing) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        const { password, ...rest } = updateUserDto;

        // 비밀번호가 있으면 해시 처리
        const data: any = { ...rest };
        if (password) {
            data.password = await bcrypt.hash(password, 10);
        }

        const user = await this.prisma.user.update({
            where: { id },
            data,
        });
        return plainToInstance(UserResponseDto, user, {
            excludeExtraneousValues: true,
        });
    }

    // 유저 삭제
    async remove(id: number): Promise<UserResponseDto> {
        // 존재 확인
        const existing = await this.prisma.user.findUnique({ where: { id } });
        if (!existing) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        const user = await this.prisma.user.delete({
            where: { id },
        });
        return plainToInstance(UserResponseDto, user, {
            excludeExtraneousValues: true,
        });
    }
}
