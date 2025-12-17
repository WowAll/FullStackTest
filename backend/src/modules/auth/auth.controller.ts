import { Controller, Post, Body, UseGuards, Request, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from '../../common/guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    @ApiOperation({ summary: '회원가입', description: '새로운 사용자 계정을 생성합니다. (HttpOnly Cookie 설정)' })
    @ApiResponse({ status: 201, description: '회원가입 성공. 토큰과 사용자 정보 반환' })
    @ApiResponse({ status: 400, description: '잘못된 입력 데이터' })
    @ApiResponse({ status: 409, description: '이미 존재하는 이메일' })
    async signup(@Res({ passthrough: true }) response: Response, @Body() signupDto: SignupDto) {
        const { user, access_token } = await this.authService.signup(signupDto);

        // HttpOnly Cookie 설정 (로그인과 동일 옵션)
        response.cookie('Authentication', access_token, {
            httpOnly: true,
            path: '/',
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'lax',
            secure: false
        });

        return { message: 'Signup successful', user };
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiOperation({ summary: '로그인', description: '이메일과 비밀번호로 로그인합니다. (HttpOnly Cookie 사용)' })
    @ApiBody({ type: LoginDto })
    @ApiResponse({ status: 200, description: '로그인 성공' })
    @ApiResponse({ status: 401, description: '인증 실패' })
    async login(@Request() req, @Res({ passthrough: true }) response: Response) {
        const { access_token } = await this.authService.login(req.user);

        // HttpOnly Cookie 설정 (명시적 옵션 추가)
        response.cookie('Authentication', access_token, {
            httpOnly: true,
            path: '/',
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'lax', // CSRF 보호 및 GET/POST 허용
            secure: false    // 로컬 개발 환경(HTTP) 호환
        });

        return { message: 'Login successful', user: req.user };
    }

    @Post('logout')
    @ApiOperation({ summary: '로그아웃', description: '쿠키를 삭제하여 로그아웃합니다.' })
    @ApiResponse({ status: 200, description: '로그아웃 성공' })
    async logout(@Res({ passthrough: true }) response: Response) {
        response.cookie('Authentication', '', {
            httpOnly: true,
            path: '/',
            expires: new Date(0),
        });
        return { message: 'Logged out successfully' };
    }
}
