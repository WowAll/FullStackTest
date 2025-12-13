import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-orange-600">Tistory</h1>
                <p className="text-sm text-gray-600 mt-2">다시 만나서 반가워요!</p>
            </div>

            <LoginForm />

            <div className="mt-4 text-center text-sm">
                계정이 없으신가요?{" "}
                <Link href="/signup" className="underline hover:text-orange-600">
                    회원가입
                </Link>
            </div>
        </div>
    );
}