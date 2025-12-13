"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUserStore from "@/stores/useUserStore";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
    const { login } = useUserStore();

    // 1. React Hook Form 설정
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    // 2. 폼 제출 핸들러 (실제로는 API 요청을 보내야 함)
    const onSubmit = async (data) => {
        // API 요청 시늉 (1초 대기)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // 더미 로그인 처리
        if (data.email) {
            alert(`환영합니다! ${data.email}님`);
            login({ email: data.email, nickname: "TistoryUser" }); // Zustand 상태 업데이트
            router.push("/"); // 메인으로 이동
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm">
            <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                    id="email"
                    placeholder="example@tistory.com"
                    {...register("email")} // RHF 연결
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    {...register("password")}
                />
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "로그인 중..." : "로그인"}
            </Button>
        </form>
    );
}