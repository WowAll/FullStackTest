import { Exclude, Expose, Type, Transform } from 'class-transformer';

class PostWriter {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    email: string;
}

@Exclude()
export class PostResponseDto {
    @Expose()
    id: number;

    @Expose()
    title: string;

    @Expose()
    content: string;

    @Expose()
    writerId: number;

    @Expose()
    @Type(() => PostWriter)
    writer: PostWriter;

    @Expose()
    views: number;

    @Expose()
    thumbnail: string;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    @Expose()
    @Transform(({ obj }) => obj._count?.comments || 0)
    commentCount: number;
}
