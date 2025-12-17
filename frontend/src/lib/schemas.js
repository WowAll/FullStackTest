import { z } from "zod";

// 로그인 스키마
export const loginSchema = z.object({
    email: z.string().email("유효한 이메일 주소를 입력해주세요."),
    password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
});

// 회원가입 스키마
export const signupSchema = z.object({
    name: z.string().min(2, "이름은 2자 이상이어야 합니다."),
    email: z.string().email("유효한 이메일 주소를 입력해주세요."),
    password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"], // 에러 메시지가 표시될 필드
});

// 게시물 생성/수정 스키마
export const postSchema = z.object({
    title: z.string()
        .min(1, "제목을 입력해주세요.")
        .max(100, "제목은 100자 이하로 입력해주세요."),
    content: z.string()
        .min(1, "내용을 입력해주세요.")
        .max(10000, "내용은 10000자 이하로 입력해주세요."),
});
