import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async signup(signupDto: SignupDto) {
        const { email, password, name } = signupDto;

        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(password, 10);

        // 유저 생성
        let user;
        try {
            user = await this.prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                },
            });
        } catch (error) {
            if (error.code === 'P2002') {
                throw new ConflictException('Email already exists');
            }
            throw error;
        }

        // JWT 토큰 생성
        const payload = { sub: user.id, email: user.email };
        const access_token = this.jwtService.sign(payload);

        return {
            user: plainToInstance(UserResponseDto, user, {
                excludeExtraneousValues: true,
            }),
            access_token,
        };
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { sub: user.id, email: user.email };
        const access_token = this.jwtService.sign(payload);

        return {
            user: plainToInstance(UserResponseDto, user, {
                excludeExtraneousValues: true,
            }),
            access_token,
        };
    }
}
