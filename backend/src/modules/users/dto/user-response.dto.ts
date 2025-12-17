import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDto {
    @Expose()
    id: number;

    @Expose()
    email: string;

    @Expose()
    name: string | null;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    // password는 자동으로 제외됨
}
